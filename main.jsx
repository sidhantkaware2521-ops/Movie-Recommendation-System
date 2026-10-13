import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Play, Plus, Check, ChevronRight, Star, Clock3, Film,
  Sparkles, X, ArrowLeft, Heart, SlidersHorizontal
} from "lucide-react";
import "./styles.css";

const titles = [
  { id: 1, name: "Demon Slayer", type: "Anime", year: 2019, rating: 8.6, genre: ["Action", "Fantasy"], duration: "4 seasons", poster: "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6m4nY3U.jpg", backdrop: "https://image.tmdb.org/t/p/original/2n9s7D4Q4j4s6p0F7e2bQwQkV5A.jpg", description: "A kind-hearted boy joins the Demon Slayer Corps after his family is slaughtered and his younger sister is turned into a demon.", tags: ["Dark fantasy", "Adventure"], match: 98 },
  { id: 2, name: "Your Name", type: "Anime", year: 2016, rating: 8.4, genre: ["Romance", "Fantasy"], duration: "1h 46m", poster: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgMj9QY3a.jpg", description: "Two teenagers find themselves mysteriously connected across distance and time, changing each other's lives in unexpected ways.", tags: ["Emotional", "Beautiful visuals"], match: 96 },
  { id: 3, name: "Interstellar", type: "Movie", year: 2014, rating: 8.7, genre: ["Sci-Fi", "Adventure"], duration: "2h 49m", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", description: "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.", tags: ["Mind-bending", "Epic"], match: 95 },
  { id: 4, name: "Jujutsu Kaisen", type: "Anime", year: 2020, rating: 8.5, genre: ["Action", "Fantasy"], duration: "2 seasons", poster: "https://image.tmdb.org/t/p/w500/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg", description: "A student enters a hidden world of curses after swallowing a powerful cursed object to protect his friends.", tags: ["Supernatural", "Fast-paced"], match: 94 },
  { id: 5, name: "Spider-Man: Across the Spider-Verse", type: "Movie", year: 2023, rating: 8.6, genre: ["Action", "Sci-Fi"], duration: "2h 20m", poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5XjRGcl3.jpg", description: "Miles Morales swings into a multiverse of Spider-heroes and faces a choice that could change everything.", tags: ["Stylish", "Multiverse"], match: 93 },
  { id: 6, name: "Attack on Titan", type: "Anime", year: 2013, rating: 9.1, genre: ["Action", "Drama"], duration: "4 seasons", poster: "https://image.tmdb.org/t/p/w500/hTP1DtLGFanxQy9BdhwSVzL3ME3.jpg", description: "Humanity fights for survival behind enormous walls while terrifying secrets about the world slowly emerge.", tags: ["Intense", "Mystery"], match: 99 },
  { id: 7, name: "The Batman", type: "Movie", year: 2022, rating: 7.8, genre: ["Action", "Crime"], duration: "2h 56m", poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", description: "In his second year fighting crime, Batman uncovers corruption in Gotham while pursuing a mysterious killer.", tags: ["Noir", "Detective"], match: 90 },
  { id: 8, name: "Spirited Away", type: "Anime", year: 2001, rating: 8.6, genre: ["Fantasy", "Adventure"], duration: "2h 5m", poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", description: "A young girl enters a strange spirit world and must find courage to rescue her parents and return home.", tags: ["Magical", "Classic"], match: 97 },
  { id: 9, name: "Dune: Part Two", type: "Movie", year: 2024, rating: 8.5, genre: ["Sci-Fi", "Adventure"], duration: "2h 46m", poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", description: "Paul Atreides unites with Chani and the Fremen while seeking revenge and confronting a future only he can foresee.", tags: ["Epic", "World-building"], match: 92 },
  { id: 10, name: "One Piece", type: "Anime", year: 1999, rating: 8.7, genre: ["Adventure", "Comedy"], duration: "Ongoing", poster: "https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg", description: "A spirited pirate captain and his crew sail across dangerous seas in search of the legendary One Piece treasure.", tags: ["Adventure", "Friendship"], match: 91 },
  { id: 11, name: "The Lord of the Rings: The Fellowship of the Ring", type: "Movie", year: 2001, rating: 8.8, genre: ["Fantasy", "Adventure"], duration: "2h 58m", poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", description: "A humble hobbit begins a dangerous journey to destroy a powerful ring and protect Middle-earth.", tags: ["Classic", "Epic"], match: 94 },
  { id: 12, name: "Chainsaw Man", type: "Anime", year: 2022, rating: 8.3, genre: ["Action", "Horror"], duration: "1 season", poster: "https://image.tmdb.org/t/p/w500/npdB6eFzizki0WaZ1OvKcJrWe97.jpg", description: "A young devil hunter is betrayed, then brought back with the power to transform parts of his body into chainsaws.", tags: ["Wild", "Dark"], match: 92 }
];

const genres = ["All", "Action", "Adventure", "Fantasy", "Sci-Fi", "Romance", "Drama", "Comedy", "Horror", "Crime"];
const imageFallback = "https://placehold.co/500x750/101522/e9e9f2?text=CineVerse";

function Poster({ item, onClick }) {
  const [failed, setFailed] = useState(false);
  return <button className="poster-card" onClick={() => onClick(item)} aria-label={`View ${item.name} details`}>
    <div className="poster-wrap">
      <img src={failed ? imageFallback : item.poster} alt={`${item.name} poster`} loading="lazy" onError={() => setFailed(true)} />
      <span className="match">{item.match}% match</span>
      <span className="poster-play"><Play size={20} fill="currentColor" /></span>
    </div>
    <div className="poster-meta">
      <div className="poster-title">{item.name}</div>
      <div className="poster-sub"><span>{item.year}</span><span className="dot">•</span><span>{item.type}</span><span className="rating"><Star size={12} fill="currentColor" /> {item.rating}</span></div>
    </div>
  </button>;
}

function App() {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const filtered = useMemo(() => titles.filter(t => {
    const text = `${t.name} ${t.type} ${t.genre.join(" ")} ${t.description}`.toLowerCase();
    return text.includes(query.toLowerCase()) &&
      (activeGenre === "All" || t.genre.includes(activeGenre)) &&
      (activeType === "All" || t.type === activeType);
  }), [query, activeGenre, activeType]);

  const recommended = [...titles].sort((a,b) => b.match-a.match).slice(0, 6);
  const trending = [titles[5], titles[0], titles[2], titles[4], titles[8], titles[3]];
  const similar = selected ? titles.filter(t => t.id !== selected.id && t.genre.some(g => selected.genre.includes(g))).slice(0, 5) : [];
  const toggleSaved = (id) => setSaved(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);

  return <div className="app-shell">
    <div className="video-bg" aria-hidden="true">
      <video autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=80">
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="video-tint"></div>
    </div>
    <header className="topbar">
      <button className="brand" onClick={() => { setSelected(null); window.scrollTo({top:0,behavior:"smooth"}); }}>
        <span className="brand-icon"><Film size={20}/></span><span>CINE<span className="brand-accent">VERSE</span></span>
      </button>
      <nav className="main-nav"><button className={!selected ? "nav-active" : ""} onClick={() => setSelected(null)}>Discover</button><button onClick={() => {setActiveType("Anime");setSelected(null);}}>Anime</button><button onClick={() => {setActiveType("Movie");setSelected(null);}}>Movies</button><button onClick={() => {setQuery("");setActiveGenre("All");setActiveType("All");setSelected(null);}}>Explore</button></nav>
      <div className="top-actions">
        <label className={`search-box ${showSearch ? "search-open" : ""}`}><Search size={17}/><input value={query} onFocus={() => setShowSearch(true)} onChange={e=>{setQuery(e.target.value);setSelected(null);}} placeholder="Search titles, genres..." /><button className="clear-search" onClick={()=>{setQuery("");setShowSearch(false)}} aria-label="Clear search"><X size={14}/></button></label>
        <button className="avatar" title="Saved titles" onClick={() => {setQuery("");setActiveGenre("All");setActiveType("All");setSelected(null);}}>CV</button>
      </div>
    </header>

    {selected ? <main className="detail-page">
      <button className="back-btn" onClick={()=>setSelected(null)}><ArrowLeft size={16}/> Back to discovery</button>
      <section className="detail-hero">
        <div className="detail-copy">
          <div className="eyebrow"><Sparkles size={14}/> CURATED FOR YOU <span className="pill">{selected.type}</span></div>
          <h1>{selected.name}</h1>
          <div className="detail-stats"><span className="score"><Star size={15} fill="currentColor"/> {selected.rating}</span><span>{selected.year}</span><span>{selected.duration}</span><span>{selected.genre.join(" / ")}</span></div>
          <p>{selected.description}</p>
          <div className="tag-row">{selected.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
          <div className="detail-actions"><button className="primary-btn" onClick={()=>alert("Demo project: connect a licensed streaming provider to enable playback.")}><Play size={17} fill="currentColor"/> Watch trailer</button><button className="secondary-btn" onClick={()=>toggleSaved(selected.id)}>{saved.includes(selected.id)?<Check size={17}/>:<Plus size={17}/>} {saved.includes(selected.id)?"Added to list":"My list"}</button></div>
          <div className="match-note"><Sparkles size={15}/> <strong>{selected.match}% match</strong> based on genres and story themes</div>
        </div>
        <div className="detail-poster"><img src={selected.poster} alt={`${selected.name} poster`} onError={e=>e.currentTarget.src=imageFallback}/><div className="poster-glow"></div></div>
      </section>
      <section className="content-section"><div className="section-heading"><div><span className="section-kicker">KEEP EXPLORING</span><h2>Because you liked this</h2></div></div><div className="poster-grid">{similar.map(t=><Poster key={t.id} item={t} onClick={setSelected}/>)}</div></section>
    </main> : <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot"></span> YOUR NEXT OBSESSION STARTS HERE</div>
          <h1>Stories that<br/>stay <span>with you.</span></h1>
          <p>Discover unforgettable anime and movies, handpicked around your taste. Find your next favourite in a universe of stories.</p>
          <div className="hero-actions"><button className="primary-btn" onClick={()=>document.getElementById("catalogue").scrollIntoView({behavior:"smooth"})}><Sparkles size={17}/> Explore titles <ChevronRight size={17}/></button><button className="ghost-btn" onClick={()=>{setActiveGenre("All");setActiveType("All");document.getElementById("recommendations").scrollIntoView({behavior:"smooth"});}}><Play size={16}/> See recommendations</button></div>
          <div className="hero-proof"><div className="proof-avatars"><span>A</span><span>M</span><span>✦</span></div><div><strong>Made for curious minds</strong><small>Anime, cinema & everything between</small></div></div>
        </div>
        <div className="hero-art">
          <div className="orb orb-one"></div><div className="orb orb-two"></div>
          <div className="floating-poster fp-one"><img src={titles[5].poster} alt="Attack on Titan poster" onError={e=>e.currentTarget.src=imageFallback}/></div>
          <div className="floating-poster fp-two"><img src={titles[2].poster} alt="Interstellar poster" onError={e=>e.currentTarget.src=imageFallback}/></div>
          <div className="floating-poster fp-three"><img src={titles[1].poster} alt="Your Name poster" onError={e=>e.currentTarget.src=imageFallback}/></div>
          <div className="hero-center"><div className="hero-center-ring"><Sparkles size={34}/></div><span>FIND YOUR<br/>NEXT WORLD</span></div>
          <div className="floating-label"><span className="live-dot"></span> YOUR PERSONAL CINEMA</div>
        </div>
      </section>

      <section className="recommend-strip" id="recommendations"><div className="strip-icon"><Sparkles size={18}/></div><div className="strip-copy"><strong>Picked for your next watch</strong><span>Recommendations based on genre, mood and story themes.</span></div><button onClick={()=>document.getElementById("catalogue").scrollIntoView({behavior:"smooth"})}>View all <ChevronRight size={15}/></button></section>

      <section className="content-section" id="catalogue">
        <div className="section-heading"><div><span className="section-kicker">THE GOOD STUFF</span><h2>{query ? "Search results" : "Explore the universe"}</h2><p>{query ? `${filtered.length} result(s) for “${query}”` : "Find a story worth staying up for."}</p></div><div className="filter-icon"><SlidersHorizontal size={16}/> <span>Filter by</span></div></div>
        <div className="filter-row"><div className="type-tabs">{["All","Anime","Movie"].map(t=><button key={t} className={activeType===t?"selected":""} onClick={()=>setActiveType(t)}>{t==="Movie"?"Movies":t}</button>)}</div><div className="genre-list">{genres.map(g=><button key={g} className={activeGenre===g?"genre-active":""} onClick={()=>setActiveGenre(g)}>{g}</button>)}</div></div>
        {query || activeGenre!=="All" || activeType!=="All" ? <div className="poster-grid">{filtered.map(t=><Poster key={t.id} item={t} onClick={setSelected}/>)}</div> : <>
          <div className="section-heading compact"><div><h3><span className="heading-line"></span>Trending this week</h3></div><button className="text-link" onClick={()=>{setActiveType("All");setActiveGenre("All");}}>See all <ChevronRight size={15}/></button></div>
          <div className="poster-grid">{trending.map(t=><Poster key={t.id} item={t} onClick={setSelected}/>)}</div>
          <div className="section-heading compact second"><div><h3><span className="heading-line purple"></span>Recommended for you</h3><p>Based on popular genres and high community ratings.</p></div></div>
          <div className="poster-grid">{recommended.map(t=><Poster key={t.id} item={t} onClick={setSelected}/>)}</div>
        </>}
        {filtered.length===0 && <div className="empty-state"><Search size={28}/><h3>No titles found</h3><p>Try another title or choose a different genre.</p><button className="secondary-btn" onClick={()=>{setQuery("");setActiveGenre("All");setActiveType("All");}}>Reset filters</button></div>}
      </section>
    </main>}
    <footer><button className="brand footer-brand" onClick={()=>{setSelected(null);window.scrollTo({top:0,behavior:"smooth"});}}><span className="brand-icon"><Film size={18}/></span><span>CINE<span className="brand-accent">VERSE</span></span></button><span>Discover stories. Find your universe.</span><span className="footer-note">Student mini project · Demo catalogue</span></footer>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
