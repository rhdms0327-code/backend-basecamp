// Backend Basecamp 예시 앱 — Vue 3 (CDN) + Argon CSS. 데이터는 data/index.json, 글은 docs/*.md
const { createApp, ref, reactive, computed, watch, nextTick, onMounted } = Vue;

const THEME = ['primary', 'info', 'success', 'warning', 'danger', 'default'];
const COLORS = ['#5e72e4', '#11cdef', '#2dce89', '#fb6340', '#f5365c', '#172b4d'];
const stripEmoji = (s) => (s || '').replace(/[\p{Extended_Pictographic}️‍]+/gu, '').trim();
const trunc = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

function parseRoute() {
  const h = decodeURIComponent(location.hash.replace(/^#/, '')) || '/';
  if (h.startsWith('/p/')) return { type: 'post', id: h.slice(3) };
  if (h.startsWith('/t/')) return { type: 'topic', key: h.slice(3) };
  return { type: 'home' };
}

createApp({
  template: `
  <div v-if="loaded">
    <header class="topbar">
      <button class="ibtn" @click="toggleSide" :aria-expanded="String(!collapsed)" aria-label="사이드바 접기/펼치기" title="사이드바 접기/펼치기 ( [ )">☰</button>
      <b class="tb-brand" role="button" tabindex="0" @click="go('/')" @keydown.enter="go('/')">Backend Basecamp</b>
      <nav class="tb-crumb" aria-label="현재 위치">
        <template v-for="(c, i) in crumbs" :key="i">
          <span v-if="i" class="sep">›</span>
          <button v-if="c.path && i < crumbs.length - 1" class="plain-link" @click="go(c.path)">{{ c.label }}</button>
          <span v-else :class="{ cur: i === crumbs.length - 1 }">{{ c.label }}</span>
        </template>
      </nav>
      <span class="sp"></span>
      <kbd title="사이드바 접기/펼치기 단축키">[</kbd>
    </header>
    <section class="section-shaped hero-band">
      <div class="shape shape-style-1 shape-default">
        <span class="span-150"></span><span class="span-50"></span><span class="span-50"></span><span class="span-75"></span><span class="span-100"></span><span class="span-75"></span><span class="span-50"></span><span class="span-100"></span><span class="span-50"></span><span class="span-100"></span>
      </div>
      <div class="container" :class="{ wide: collapsed }">

        <template v-if="route.type === 'home'">
          <h1>공부한 것을 한곳에 모아 둔 기록</h1>
          <p class="lead">왼쪽에서 주제를 고르거나, 아래 최근 글부터 읽어 보세요.</p>
          <div class="stats">
            <span class="badge badge-pill">전체 <b>{{ posts.length }}</b>편</span>
            <span class="badge badge-pill">주제 <b>{{ activeTopics }}</b>개</span>
            <span class="badge badge-pill">마지막 정리 <b>{{ posts[0].date }}</b></span>
          </div>
        </template>

        <template v-else-if="route.type === 'topic' && topic">
          <h1>{{ topic.title }}</h1>
          <div class="meta"><span class="badge badge-pill">글 {{ topicPosts.length }}편</span></div>
        </template>

        <template v-else-if="route.type === 'post' && post">
          <h1>{{ post.title }}</h1>
          <div class="meta">
            <span class="badge badge-pill">{{ post.date }}</span><span class="badge badge-pill">읽는 시간 약 {{ readMin }}분</span>
            <div class="hdrnav">
              <button :disabled="!prevPost" @click="goPost(prevPost)" aria-label="이전 글">‹</button>
              <span class="pos mono">{{ seqIdx + 1 }} / {{ seq.length }}</span>
              <button :disabled="!nextPost" @click="goPost(nextPost)" aria-label="다음 글">›</button>
            </div>
          </div>
          <div class="prog"><i :style="{ width: ((seqIdx + 1) / seq.length * 100) + '%' }"></i></div>
        </template>
      </div>
    </section>

    <div class="container shell" :class="{ wide: collapsed }">
      <div class="row align-items-start">
        <div class="col-lg-3" id="sidecol" :class="{ on: menuOpen, 'side-hidden': collapsed }">
          <aside class="card shadow border-0 sidecard" aria-label="주제 탐색">
            <input class="search" v-model.trim="q" type="search" placeholder="글 제목 검색" aria-label="글 제목 검색" autocomplete="off">
            <nav class="nav-tree">
              <button :aria-current="route.type === 'home' && !q ? 'page' : null" @click="go('/')">홈<span class="n mono">{{ posts.length }}</span></button>
              <div v-for="c in cats" :key="c.slug" class="cat" :class="{ open: openCats.has(c.slug) }">
                <button :aria-expanded="openCats.has(c.slug)" @click="toggleCat(c.slug)">
                  <span class="chev">▶</span><span class="dot" :style="{ background: c.color }"></span>{{ c.title }}<span class="n mono">{{ c.count }}</span>
                </button>
                <div class="topics">
                  <template v-if="c.topics.length">
                    <button v-for="t in c.topics" :key="t.key" :aria-current="isCurrentTopic(t) ? 'page' : null" @click="go('/t/' + t.key)">{{ t.title }}<span class="n mono">{{ t.count }}</span></button>
                  </template>
                  <div v-else class="soon">준비 중</div>
                </div>
              </div>
            </nav>
            <div class="sidefoot">글 {{ posts.length }}편 · 마지막 정리 {{ posts[0].date }}</div>
          </aside>
        </div>

        <main :class="collapsed ? 'col-lg-12' : 'col-lg-9'" style="min-width:0">
          <!-- 검색 -->
          <template v-if="q">
            <div class="card shadow border-0 pagehead"><h1>“{{ q }}” 검색 결과</h1><div class="mt-2"><span class="badge badge-pill badge-primary">{{ results.length }}편</span></div></div>
            <div v-if="results.length" class="card shadow-sm border-0 plist">
              <button v-for="p in results.slice(0, 30)" :key="p.path" class="prow" @click="open(p)">
                <span class="date mono">{{ p.date }}</span>
                <span class="t">{{ p.title }}<span class="s">{{ trunc(p.sum, 110) }}</span></span>
                <span :class="['badge badge-pill', 'badge-' + catOf(p).theme]">{{ topicOf(p).title }}</span>
              </button>
            </div>
            <p v-else class="empty-note">일치하는 글이 없습니다. 다른 단어로 찾아 보세요.</p>
          </template>

          <!-- 홈 -->
          <template v-else-if="route.type === 'home'">
            <section class="sec">
              <div class="sechead"><h2>최근 글</h2><span>가장 최근에 정리한 순서</span></div>
              <div class="feat">
                <button class="plain" @click="open(posts[0])"><div class="card shadow-lg border-0 big">
                  <div><span :class="['badge badge-pill', 'badge-' + catOf(posts[0]).theme]">{{ topicOf(posts[0]).title }}</span></div>
                  <h3>{{ posts[0].title }}</h3>
                  <p>{{ posts[0].sum }}</p>
                  <div class="foot"><span class="date mono">{{ posts[0].date }}</span><span class="btn btn-primary btn-sm">읽기</span></div>
                </div></button>
                <div class="minis">
                  <button v-for="p in posts.slice(1, 3)" :key="p.path" class="plain" style="flex:1" @click="open(p)">
                    <div class="card shadow card-lift--hover border-0" style="height:100%">
                      <div><span :class="['badge badge-pill', 'badge-' + catOf(p).theme]">{{ topicOf(p).title }}</span></div>
                      <h4>{{ p.title }}</h4><span class="date mono">{{ p.date }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            <section class="sec">
              <div class="sechead"><h2>이어서 보기</h2><span>그다음 글 8편</span></div>
              <div class="card shadow-sm border-0 plist">
                <button v-for="p in posts.slice(3, 11)" :key="p.path" class="prow" @click="open(p)">
                  <span class="date mono">{{ p.date }}</span>
                  <span class="t">{{ p.title }}<span class="s">{{ trunc(p.sum, 110) }}</span></span>
                  <span :class="['badge badge-pill', 'badge-' + catOf(p).theme]">{{ topicOf(p).title }}</span>
                </button>
              </div>
            </section>

            <section class="sec">
              <div class="sechead"><h2>주제별 둘러보기</h2><span>카드를 누르면 해당 주제의 글 목록으로 이동</span></div>
              <div class="tgrid">
                <button v-for="t in allTopics" :key="t.key" class="card shadow-sm border-0 tcard" :class="{ 'card-lift--hover': t.count }" :disabled="!t.count" @click="go('/t/' + t.key)">
                  <span :class="['icon icon-shape text-white rounded-circle shadow', 'bg-gradient-' + t.cat.theme]">{{ t.title.charAt(0) }}</span>
                  <span class="name">{{ t.title }}</span>
                  <span class="cnt">{{ clean(t.cat.title) }} · {{ t.count ? t.count + '편' : '준비 중' }}</span>
                  <span v-if="t.count" class="last">최근 · {{ t.latest.title }}</span>
                </button>
              </div>
            </section>

            <section class="sec">
              <div class="sechead"><h2>월별 정리량</h2><span>글 작성일 기준</span></div>
              <div class="card shadow-sm border-0 months">
                <div v-for="m in monthly" :key="m.k" class="mcol"><span class="v mono">{{ m.n }}</span><div class="bar" :style="{ height: m.h + '%' }"></div><span>{{ m.label }}</span></div>
              </div>
            </section>
          </template>

          <!-- 주제 목록 -->
          <template v-else-if="route.type === 'topic' && topic">
            <div class="card shadow-sm border-0 plist">
              <button v-for="p in topicPosts" :key="p.path" class="prow" @click="open(p)">
                <span class="date mono">{{ p.date }}</span>
                <span class="t">{{ p.title }}<span class="s">{{ trunc(p.sum, 110) }}</span></span>
                <span :class="['badge badge-pill', 'badge-' + catOf(p).theme]">{{ topicOf(p).title }}</span>
              </button>
            </div>
          </template>

          <!-- 글 읽기 -->
          <template v-else-if="route.type === 'post' && post">
            <div class="postgrid"><div class="postmain">
            <p v-if="loading" class="empty-note">불러오는 중…</p>
            <template v-else>
              <div v-if="lead" class="card shadow-sm border-0 lead-box md" v-html="lead"></div>

              <article class="card shadow-sm border-0 article md">
                <section v-for="(s, i) in sections" :key="i" class="art-sec">
                  <h2>{{ s.title }}</h2>
                  <div v-html="s.html"></div>
                </section>
              </article>

              <div class="pager">
                <button class="pcard" :disabled="!prevPost" @click="goPost(prevPost)">
                  <template v-if="prevPost"><small>← 이전 글 · {{ seqIdx }}/{{ seq.length }}</small><b>{{ prevPost.title }}</b><span>{{ trunc(prevPost.sum, 90) }}</span></template>
                  <template v-else><small>처음 글입니다</small><b>이 주제의 시작</b><span>이전 글이 없습니다.</span></template>
                </button>
                <button class="pcard next" :class="{ end: !nextPost }" @click="nextPost ? goPost(nextPost) : go('/t/' + post.c + '/' + post.t)">
                  <template v-if="nextPost"><small>다음 글 · {{ seqIdx + 2 }}/{{ seq.length }} →</small><b>{{ nextPost.title }}</b><span>{{ trunc(nextPost.sum, 90) }}</span></template>
                  <template v-else><small>마지막 글입니다 ✓</small><b>주제 목록으로 돌아가기</b><span>{{ topicOf(post).title }} · 전체 {{ seq.length }}편</span></template>
                </button>
              </div>
            </template>
            </div>

            <aside class="card shadow-sm border-0 rail" aria-label="이 주제의 순서">
              <h3><span>이 주제의 순서</span><span class="mono">{{ readCount }}/{{ seq.length }} 읽음</span></h3>
              <ol>
                <li v-for="(s, i) in seq" :key="s.path" :class="{ cur: i === seqIdx, read: i !== seqIdx && isRead(s) }">
                  <button :aria-current="i === seqIdx ? 'page' : null" @click="goPost(s)"><span class="no mono">{{ i !== seqIdx && isRead(s) ? '✓' : i + 1 }}</span><span class="t">{{ s.title }}</span></button>
                </li>
              </ol>
              <button class="rail-all" @click="go('/t/' + post.c + '/' + post.t)">주제 목록 보기</button>
            </aside>
            </div>
          </template>
        </main>
      </div>
    </div>
    <div class="toast" :class="{ on: toastOn }" role="status">{{ toastMsg }}</div>
  </div>`,

  setup() {
    const index = reactive({ cats: {}, posts: [] });
    const loaded = ref(false);
    const route = ref(parseRoute());
    const q = ref('');
    const menuOpen = ref(false);
    const openCats = reactive(new Set(['01-dotnet']));
    const toastOn = ref(false), toastMsg = ref('');
    let toastTimer;

    // post state
    const loading = ref(false), lead = ref(''), sections = ref([]);

    const cats = computed(() => {
      // 최상위 폴더(01-…, 02-…)를 이름순으로 카테고리로 삼는다
      const slugs = [...new Set(Object.keys(index.cats).map((k) => k.split('/')[0]))].sort();
      const list = slugs.map((slug, i) => ({
        slug, theme: THEME[i % THEME.length], color: COLORS[i % COLORS.length],
        title: index.cats[slug] || slug, topics: [], count: 0,
      }));
      for (const [key, title] of Object.entries(index.cats)) {
        const [c, t] = key.split('/');
        const cat = list.find((x) => x.slug === c);
        if (!t || !cat) continue;
        const ps = posts.value.filter((p) => p.key === key);
        cat.topics.push({ slug: t, key, title: stripEmoji(title), cat, count: ps.length, latest: ps[0] });
      }
      list.forEach((c) => (c.count = posts.value.filter((p) => p.c === c.slug).length));
      return list;
    });
    const allTopics = computed(() => cats.value.flatMap((c) => c.topics));
    const posts = computed(() =>
      index.posts
        .map((p) => ({ ...p, title: stripEmoji(p.title), key: p.t ? `${p.c}/${p.t}` : p.c }))
        .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'ko'))
    );
    const topicOf = (p) => allTopics.value.find((t) => t.key === p.key) || { title: '' };
    const catOf = (p) => cats.value.find((c) => c.slug === p.c) || { theme: 'primary', title: '' };
    const topic = computed(() => route.value.type === 'topic' ? allTopics.value.find((t) => t.key === route.value.key) : (post.value ? topicOf(post.value) : null));
    // 학습 순서: 주제 index.md 표의 순서 → 없으면 날짜순
    const inOrder = (key) =>
      posts.value.filter((p) => p.key === key)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.date.localeCompare(b.date) || a.path.localeCompare(b.path));
    const topicPosts = computed(() => (topic.value ? inOrder(topic.value.key) : []));
    const post = computed(() => (route.value.type === 'post' ? posts.value.find((p) => p.path === route.value.id) : null));
    const seq = computed(() => (post.value ? inOrder(post.value.key) : []));
    const seqIdx = computed(() => (post.value ? seq.value.findIndex((p) => p.path === post.value.path) : -1));
    const prevPost = computed(() => seq.value[seqIdx.value - 1] || null);
    const nextPost = computed(() => seq.value[seqIdx.value + 1] || null);

    // 읽은 글 표시 (이 브라우저에만 저장)
    const READ_KEY = 'bb-read';
    const readSet = reactive(new Set());
    try { JSON.parse(localStorage.getItem(READ_KEY) || '[]').forEach((x) => readSet.add(x)); } catch (e) { /* 저장소를 못 쓰면 이번 세션만 */ }
    const isRead = (p) => readSet.has(p.path);
    const readCount = computed(() => seq.value.filter((p) => readSet.has(p.path)).length);
    function markRead(p) {
      readSet.add(p.path);
      try { localStorage.setItem(READ_KEY, JSON.stringify([...readSet])); } catch (e) { /* ignore */ }
    }
    const activeTopics = computed(() => allTopics.value.filter((t) => t.count).length);
    const results = computed(() => {
      const s = q.value.toLowerCase();
      return posts.value.filter((p) => (p.title + p.sum).toLowerCase().includes(s));
    });
    const monthly = computed(() => {
      const m = {};
      posts.value.forEach((p) => { const k = p.date.slice(0, 7); m[k] = (m[k] || 0) + 1; });
      const keys = Object.keys(m).sort();
      if (!keys.length) return [];
      const out = [];
      let [y, mo] = keys[0].split('-').map(Number);
      while (`${y}-${String(mo).padStart(2, '0')}` <= keys[keys.length - 1]) {
        const k = `${y}-${String(mo).padStart(2, '0')}`;
        out.push({ k, n: m[k] || 0, label: `${mo}월` });
        if (++mo > 12) { mo = 1; y++; }
      }
      const max = Math.max(...out.map((o) => o.n));
      return out.map((o) => ({ ...o, h: (o.n / max) * 100 }));
    });
    const readMin = ref(1);

    function showToast(msg) {
      toastMsg.value = msg; toastOn.value = true;
      clearTimeout(toastTimer); toastTimer = setTimeout(() => (toastOn.value = false), 2400);
    }
    function go(path) { q.value = ''; menuOpen.value = false; location.hash = '#' + path; }
    function open(p) { go('/p/' + p.path); }
    // 사이드바 접기: 데스크톱은 접어서 본문을 넓게, 모바일은 서랍 열기/닫기
    const SIDE_KEY = 'bb-side-collapsed';
    const collapsed = ref(false);
    try { collapsed.value = localStorage.getItem(SIDE_KEY) === '1'; } catch (e) { /* 저장소를 못 쓰면 기본값 */ }
    function toggleSide() {
      if (window.innerWidth >= 992) {
        collapsed.value = !collapsed.value;
        try { localStorage.setItem(SIDE_KEY, collapsed.value ? '1' : '0'); } catch (e) { /* ignore */ }
      } else {
        menuOpen.value = !menuOpen.value;
      }
    }
    // 상단 고정 바의 현재 위치(경로)
    const crumbs = computed(() => {
      const out = [{ label: '홈', path: '/' }];
      if (q.value) out.push({ label: '검색' });
      else if (route.value.type === 'topic' && topic.value) {
        out.push({ label: stripEmoji(topic.value.cat.title) }, { label: topic.value.title });
      } else if (route.value.type === 'post' && post.value) {
        out.push({ label: stripEmoji(catOf(post.value).title) }, { label: topicOf(post.value).title, path: '/t/' + post.value.key }, { label: post.value.title });
      }
      return out;
    });
    function goPost(p) { if (p) open(p); }
    function toggleCat(slug) { openCats.has(slug) ? openCats.delete(slug) : openCats.add(slug); }
    function isCurrentTopic(t) { return !q.value && topic.value && topic.value.key === t.key && route.value.type === 'topic'; }

    async function loadPost(p) {
      loading.value = true; lead.value = ''; sections.value = [];
      const raw = await (await fetch(`docs/${p.path}.md`)).text();
      const body = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n').replace(/^---\n[\s\S]*?\n---\n?/, '');
      readMin.value = Math.max(1, Math.round(body.replace(/```[\s\S]*?```/g, '').replace(/\s+/g, '').length / 500));
      const wrap = document.createElement('div');
      wrap.innerHTML = DOMPurify.sanitize(marked.parse(body));
      const ALERT = { NOTE: '참고', TIP: '팁', IMPORTANT: '중요', WARNING: '주의', CAUTION: '경고' };
      wrap.querySelectorAll('blockquote').forEach((bq) => {
        const m = bq.textContent.trim().match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i);
        if (!m) return;
        const kind = m[1].toUpperCase();
        const first = bq.querySelector('p') || bq;
        first.innerHTML = first.innerHTML.replace(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(<br\s*\/?>)?\s*/i, '');
        bq.classList.add('callout', 'callout-' + kind.toLowerCase());
        const t = document.createElement('strong'); t.className = 'callout-title'; t.textContent = ALERT[kind];
        bq.insertBefore(t, bq.firstChild);
      });
      wrap.querySelectorAll('img[src]').forEach((img) => {
        const src = img.getAttribute('src');
        if (/^(https?:|data:|\/)/.test(src)) return;
        const dir = p.path.split('/').slice(0, -1).join('/');
        img.setAttribute('src', 'docs' + new URL(src, 'http://x/' + dir + '/').pathname);
      });
      wrap.querySelectorAll('table').forEach((t) => {
        t.classList.add('table-sm');
        const d = document.createElement('div'); d.className = 'tbl';
        t.replaceWith(d); d.appendChild(t);
      });
      // 글 끝의 "뒤로 가기" 링크(와 그 앞 구분선)는 사이트 이동 장치가 대신하므로 렌더링하지 않는다
      wrap.querySelectorAll('a[href$="index.md"]').forEach((a) => {
        if (!/뒤로\s*가기/.test(a.textContent)) return;
        const para = a.closest('p');
        (para && para.textContent.trim() === a.textContent.trim() ? para : a).remove();
      });
      const tail = wrap.lastElementChild;
      if (tail && tail.tagName === 'HR') tail.remove();

      wrap.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href');
        if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; return; }
        if (href.startsWith('#')) return;
        // 글 안의 상대 경로 .md 링크를 사이트 라우트로 바꾼다
        const dir = p.path.split('/').slice(0, -1).join('/');
        const target = new URL(href, `http://x/${dir}/`).pathname.slice(1).replace(/\.md$/, '');
        const seg = target.split('/');
        if (index.posts.some((x) => x.path === target)) a.setAttribute('href', '#/p/' + target);
        else if (seg[seg.length - 1] === 'index' && seg.length === 3) a.setAttribute('href', '#/t/' + seg[0] + '/' + seg[1]);
        else a.setAttribute('href', '#/');
      });
      const secs = []; let intro = [], cur = null;
      for (const el of [...wrap.children]) {
        if (el.tagName === 'H2') { cur = { title: stripEmoji(el.textContent), html: '' }; secs.push(cur); }
        else if (cur) cur.html += el.outerHTML;
        else intro.push(el.outerHTML);
      }
      lead.value = intro.join('');
      sections.value = secs;
      loading.value = false;
      await nextTick();
      document.querySelectorAll('.md pre code').forEach((c) => hljs.highlightElement(c));
    }

    watch(post, (p) => { if (p) { loadPost(p); markRead(p); } }, { immediate: false });
    watch(route, () => { window.scrollTo(0, 0); document.title = (post.value ? post.value.title + ' · ' : '') + 'Backend Basecamp'; });

    onMounted(async () => {
      const data = await (await fetch('data/index.json')).json();
      index.cats = data.cats; index.posts = data.posts; loaded.value = true;
      window.addEventListener('hashchange', () => (route.value = parseRoute()));
      if (post.value) { loadPost(post.value); markRead(post.value); }
      // [ 키로 사이드바 접기/펼치기
      window.addEventListener('keydown', (e) => {
        if (e.key !== '[' || e.altKey || e.ctrlKey || e.metaKey) return;
        if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
        toggleSide();
      });
      // ← → 키로 이전/다음 글 이동
      window.addEventListener('keydown', (e) => {
        if (route.value.type !== 'post' || e.altKey || e.ctrlKey || e.metaKey) return;
        if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
        if (e.key === 'ArrowLeft') goPost(prevPost.value);
        if (e.key === 'ArrowRight') goPost(nextPost.value);
      });
    });

    return {
      loaded, collapsed, toggleSide, crumbs, route, q, menuOpen, openCats, toastOn, toastMsg, loading, lead, sections, readMin,
      cats, allTopics, posts, topic, topicPosts, post, activeTopics, results, monthly,
      seq, seqIdx, prevPost, nextPost, isRead, readCount, goPost,
      topicOf, catOf, go, open, toggleCat, isCurrentTopic,
      clean: stripEmoji, trunc,
    };
  },
}).mount('#app');
