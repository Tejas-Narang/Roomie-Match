import React, { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, Heart, MessageCircle, MapPin, GraduationCap, Sparkles, Home, Users, Bookmark, Settings2, X, Check, Cigarette, Wine, Moon, Sun, Music2, Coffee, ShieldCheck, ChevronDown, ArrowUpRight, Plus, Menu, BedDouble, Wallet, CalendarDays, Star } from 'lucide-react'

const people = [
  {id:1,name:'Aarav Mehta',age:19,course:'Computer Engineering',year:'2nd year',college:'TIET',cgpa:'8.7',city:'Jaipur',budget:12500,area:'Hostel / nearby',bio:'Usually at the gym or building something. I like a clean room, focused study sessions and the occasional movie night.',interests:['Gym','Tech','Football','Gaming','Movies'],sleep:'Late sleeper',clean:'Very tidy',study:'Quiet focus',smoke:'Never',drink:'Socially',food:'Vegetarian',guests:'Sometimes',noise:'Low',ac:'Prefer AC',schedule:'Mostly evenings',avatar:'AM',color:'lavender',compat:96,verified:true},
  {id:2,name:'Ishita Kapoor',age:18,course:'Electronics & Computer',year:'1st year',college:'TIET',cgpa:'9.1',city:'Delhi',budget:11000,area:'On campus',bio:'Design, music and coffee person. I keep shared spaces organised and appreciate clear communication.',interests:['Design','Music','Reading','Badminton','Coffee'],sleep:'Early sleeper',clean:'Very tidy',study:'Quiet focus',smoke:'Never',drink:'Never',food:'Vegetarian',guests:'Rarely',noise:'Low',ac:'No preference',schedule:'Morning person',avatar:'IK',color:'peach',compat:92,verified:true},
  {id:3,name:'Kabir Sethi',age:20,course:'Computer Engineering',year:'2nd year',college:'TIET',cgpa:'8.2',city:'Chandigarh',budget:14000,area:'Hostel / nearby',bio:'Easygoing, into basketball and music. I can be up late during project deadlines but keep things respectful.',interests:['Basketball','Music','Startups','Gaming','Fitness'],sleep:'Night owl',clean:'Moderately tidy',study:'Music is okay',smoke:'Occasionally',drink:'Socially',food:'Non-vegetarian',guests:'Sometimes',noise:'Moderate',ac:'Prefer AC',schedule:'Late evenings',avatar:'KS',color:'mint',compat:88,verified:false},
  {id:4,name:'Ananya Rao',age:19,course:'Electrical Engineering',year:'2nd year',college:'TIET',cgpa:'8.9',city:'Pune',budget:13000,area:'On campus',bio:'I love dance, long walks and a calm place to recharge. Looking for someone considerate and communicative.',interests:['Dance','Fitness','Travel','Photography','Cooking'],sleep:'Early sleeper',clean:'Very tidy',study:'Quiet focus',smoke:'Never',drink:'Never',food:'Eggetarian',guests:'Rarely',noise:'Low',ac:'No preference',schedule:'Morning person',avatar:'AR',color:'blue',compat:85,verified:true},
  {id:5,name:'Rehan Ali',age:19,course:'Mechanical Engineering',year:'2nd year',college:'TIET',cgpa:'7.9',city:'Lucknow',budget:10000,area:'Hostel / nearby',bio:'Sports, F1 and cooking. Pretty flexible, but I value honesty about habits and splitting chores fairly.',interests:['F1','Cricket','Cooking','Cars','Movies'],sleep:'Flexible',clean:'Moderately tidy',study:'Flexible',smoke:'Never',drink:'Never',food:'Non-vegetarian',guests:'Sometimes',noise:'Moderate',ac:'No preference',schedule:'Flexible',avatar:'RA',color:'yellow',compat:81,verified:true},
  {id:6,name:'Meera Nair',age:18,course:'Computer Engineering',year:'1st year',college:'TIET',cgpa:'9.3',city:'Kochi',budget:12000,area:'On campus',bio:'Bookshops, coding and trying new cafés. I prefer a neat room, a predictable routine and a friendly roommate.',interests:['Coding','Books','Cafés','Art','Badminton'],sleep:'Flexible',clean:'Very tidy',study:'Quiet focus',smoke:'Never',drink:'Never',food:'Vegetarian',guests:'Rarely',noise:'Low',ac:'Prefer AC',schedule:'Balanced',avatar:'MN',color:'rose',compat:79,verified:true}
]
const interestOptions = ['Gym','Tech','Football','Gaming','Movies','Design','Music','Reading','Badminton','Coffee','Basketball','Startups','Fitness','Travel','Photography','Cooking','F1','Cricket','Coding','Books','Art']
const initialProfile = {name:'Your name',age:'18',course:'Computer Engineering',year:'1st year',cgpa:'8.5',budget:'12000',city:'',bio:'',interests:['Tech','Gym'],sleep:'Flexible',clean:'Moderately tidy',study:'Quiet focus',smoke:'Never',drink:'Never',food:'No preference',guests:'Sometimes',noise:'Low',ac:'No preference',schedule:'Balanced',area:'On campus'}
const savedStart = [2,4]

function App(){
  const [tab,setTab] = useState('Discover')
  const [search,setSearch] = useState('')
  const [filtersOpen,setFiltersOpen] = useState(false)
  const [filters,setFilters] = useState({budget:15000,smoke:'Any',drink:'Any',sleep:'Any',food:'Any',clean:'Any'})
  const [saved,setSaved] = useState(savedStart)
  const [liked,setLiked] = useState([])
  const [selected,setSelected] = useState(null)
  const [profile,setProfile] = useState(()=>{try{return JSON.parse(localStorage.getItem('roomiematch-profile'))||initialProfile}catch{return initialProfile}})
  const [editing,setEditing] = useState(false)
  const [toast,setToast] = useState('')
  const [mobileMenu,setMobileMenu] = useState(false)

  const notify = (msg)=>{setToast(msg); window.clearTimeout(window.__roomieToast); window.__roomieToast=window.setTimeout(()=>setToast(''),2400)}
  const updateProfile = (key,value)=>setProfile(p=>({...p,[key]:value}))
  const toggleInterest = (item)=>updateProfile('interests',profile.interests.includes(item)?profile.interests.filter(x=>x!==item):[...profile.interests,item])
  const filtered = useMemo(()=>people.filter(p=>{
    const q=search.toLowerCase()
    const matchesText=!q||[p.name,p.course,p.city,...p.interests].join(' ').toLowerCase().includes(q)
    return matchesText && p.budget<=Number(filters.budget) && (filters.smoke==='Any'||p.smoke===filters.smoke) && (filters.drink==='Any'||p.drink===filters.drink) && (filters.sleep==='Any'||p.sleep===filters.sleep) && (filters.food==='Any'||p.food===filters.food) && (filters.clean==='Any'||p.clean===filters.clean)
  }).sort((a,b)=>b.compat-a.compat),[search,filters])
  const toggleSaved=(id)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])
  const toggleLike=(id)=>{setLiked(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);notify(liked.includes(id)?'Like removed':'Interest sent — nice!')}

  const nav=[['Discover',Search],['Matches',Heart],['Saved',Bookmark],['My profile',Users]]
  const visiblePeople=tab==='Saved'?people.filter(p=>saved.includes(p.id)):tab==='Matches'?people.filter(p=>liked.includes(p.id)):filtered
  const pageTitle=tab==='Discover'?'Find your kind of roommate':tab==='Matches'?'Your mutual connections':tab==='Saved'?'Your shortlist':'Your roommate profile'

  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu?'mobile-open':''}`}>
      <div className="brand"><div className="brand-mark"><Home size={19}/></div><span>roomie<span className="brand-light">match</span></span></div>
      <div className="workspace-label">YOUR SPACE</div>
      <nav>{nav.map(([label,Icon])=><button key={label} className={`nav-item ${tab===label?'active':''}`} onClick={()=>{setTab(label);setMobileMenu(false)}}><Icon size={18}/><span>{label}</span>{label==='Matches'&&liked.length>0&&<b className="nav-count">{liked.length}</b>}</button>)}</nav>
      <div className="sidebar-card"><div className="side-card-icon"><Sparkles size={17}/></div><b>Better roommates,</b><b>better memories.</b><p>Find someone whose everyday habits fit yours.</p><span className="side-dots">✳ ✳ ✳</span></div>
      <div className="sidebar-bottom"><div className="mini-avatar">YN</div><div><b>{profile.name==='Your name'?'Your profile':profile.name}</b><small>Student account · Demo</small></div><button className="icon-btn" onClick={()=>setEditing(true)} aria-label="Edit profile"><Settings2 size={17}/></button></div>
    </aside>

    <main className="main">
      <header className="topbar"><button className="mobile-toggle icon-btn" onClick={()=>setMobileMenu(!mobileMenu)}><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <b>{tab}</b></div><div className="top-actions"><span className="privacy"><ShieldCheck size={15}/> Your details stay yours</span><button className="top-avatar" onClick={()=>{setTab('My profile');setEditing(true)}}>YN</button></div></header>
      <div className="content">
        <div className="welcome-row"><div><div className="eyebrow">ROOMMATE FINDER <span>✳</span></div><h1>{pageTitle}</h1><p className="subheading">{tab==='Discover'?'People you could actually enjoy sharing a room with.':'Keep track of people and preferences as you find your fit.'}</p></div><button className="profile-setup" onClick={()=>setEditing(true)}><Plus size={16}/> Complete profile</button></div>

        {tab==='My profile'?<ProfilePage profile={profile} setEditing={setEditing}/>:<>
          <div className="stats-row">
            <div className="stat-card"><div className="stat-icon purple"><Users size={18}/></div><div><strong>{people.length}</strong><span>Student profiles</span></div></div>
            <div className="stat-card"><div className="stat-icon green"><Sparkles size={18}/></div><div><strong>{filtered.length}</strong><span>Potential fits</span></div></div>
            <div className="stat-card"><div className="stat-icon orange"><Bookmark size={18}/></div><div><strong>{saved.length}</strong><span>Saved profiles</span></div></div>
            <div className="stat-note"><span className="live-dot"></span> Demo directory <span>·</span> Updated just now</div>
          </div>
          <section className="discover-panel">
            <div className="toolbar"><div className="searchbox"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, course, city or interest..."/>{search&&<button onClick={()=>setSearch('')}><X size={15}/></button>}</div><button className={`filter-button ${filtersOpen?'selected':''}`} onClick={()=>setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={17}/> Filters <span className="filter-count">{Object.values(filters).filter(v=>v!=='Any'&&v!==15000).length}</span></button><div className="sort-label">Sort: <b>Best fit <ChevronDown size={14}/></b></div></div>
            {filtersOpen&&<div className="filter-drawer">
              <Filter label="Max monthly budget" value={filters.budget} onChange={v=>setFilters(f=>({...f,budget:Number(v)}))} options={[['8000','₹8,000'],['10000','₹10,000'],['12000','₹12,000'],['15000','₹15,000'],['20000','₹20,000']]}/>
              <Filter label="Smoking" value={filters.smoke} onChange={v=>setFilters(f=>({...f,smoke:v}))} options={['Any','Never','Occasionally','Regularly'].map(x=>[x,x])}/>
              <Filter label="Drinking" value={filters.drink} onChange={v=>setFilters(f=>({...f,drink:v}))} options={['Any','Never','Socially','Occasionally','Regularly'].map(x=>[x,x])}/>
              <Filter label="Sleep routine" value={filters.sleep} onChange={v=>setFilters(f=>({...f,sleep:v}))} options={['Any','Early sleeper','Night owl','Flexible'].map(x=>[x,x])}/>
              <Filter label="Food preference" value={filters.food} onChange={v=>setFilters(f=>({...f,food:v}))} options={['Any','Vegetarian','Eggetarian','Non-vegetarian'].map(x=>[x,x])}/>
              <Filter label="Cleanliness" value={filters.clean} onChange={v=>setFilters(f=>({...f,clean:v}))} options={['Any','Very tidy','Moderately tidy','Relaxed'].map(x=>[x,x])}/>
              <button className="reset-filter" onClick={()=>setFilters({budget:15000,smoke:'Any',drink:'Any',sleep:'Any',food:'Any',clean:'Any'})}>Reset filters</button>
            </div>}
            <div className="results-heading"><div><h2>{tab==='Saved'?'Saved students':tab==='Matches'?'People you liked':'Suggested roommates'}</h2><p>{visiblePeople.length} profiles based on your preferences</p></div><div className="match-legend"><span className="legend-dot"></span> Compatibility estimate</div></div>
            {visiblePeople.length===0?<div className="empty-state"><div className="empty-icon"><Search/></div><h3>No profiles found</h3><p>Try widening your filters or searching for a different interest.</p><button className="primary-button" onClick={()=>{setSearch('');setFilters({budget:15000,smoke:'Any',drink:'Any',sleep:'Any',food:'Any',clean:'Any'})}}>Clear filters</button></div>:
            <div className="people-grid">{visiblePeople.map(p=><PersonCard key={p.id} person={p} saved={saved.includes(p.id)} liked={liked.includes(p.id)} onSave={()=>toggleSaved(p.id)} onLike={()=>toggleLike(p.id)} onOpen={()=>setSelected(p)}/>)}</div>}
          </section>
        </>}
        <footer>RoomieMatch <span>·</span> Find your fit, respect your differences. <span className="footer-right">A student project concept</span></footer>
      </div>
    </main>
    {selected&&<ProfileModal person={selected} onClose={()=>setSelected(null)} saved={saved.includes(selected.id)} liked={liked.includes(selected.id)} onSave={()=>toggleSaved(selected.id)} onLike={()=>toggleLike(selected.id)}/>}
    {editing&&<EditModal profile={profile} setProfile={setProfile} onClose={()=>setEditing(false)} onSave={()=>{localStorage.setItem('roomiematch-profile',JSON.stringify(profile));setEditing(false);notify('Profile saved on this device')}}/>}
    {toast&&<div className="toast"><Check size={17}/>{toast}</div>}
  </div>
}

function Filter({label,value,onChange,options}){return <label className="filter-field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{options.map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label>}
function PersonCard({person:p,saved,liked,onSave,onLike,onOpen}){
 return <article className="person-card">
  <div className={`card-cover ${p.color}`}><div className="cover-orbit orbit-one"></div><div className="cover-orbit orbit-two"></div><span className="cover-tag">STUDENT PROFILE</span><button className={`save-btn ${saved?'is-saved':''}`} onClick={onSave} aria-label="Save profile"><Bookmark size={17} fill={saved?'currentColor':'none'}/></button><div className="person-avatar">{p.avatar}</div><div className="compatibility"><Sparkles size={13}/><b>{p.compat}%</b><small>fit</small></div></div>
  <div className="card-body"><div className="name-line"><div><h3>{p.name}</h3><span className="age">{p.age} yrs <i>·</i> {p.city}</span></div>{p.verified&&<span className="verified" title="Demo verified profile"><ShieldCheck size={16}/></span>}</div>
   <div className="course-line"><GraduationCap size={15}/>{p.course} <span>·</span> {p.year}</div>
   <div className="quick-facts"><span><b>CGPA</b>{p.cgpa}</span><span><b>Budget</b>₹{p.budget.toLocaleString('en-IN')}/mo</span></div>
   <p className="bio">{p.bio}</p>
   <div className="tag-list">{p.interests.slice(0,4).map(x=><span key={x}>{x}</span>)}{p.interests.length>4&&<span>+{p.interests.length-4}</span>}</div>
   <div className="habit-row"><span><Moon size={13}/>{p.sleep}</span><span><Sparkles size={13}/>{p.clean}</span></div>
   <div className="card-actions"><button className="outline-button" onClick={onOpen}>View profile <ArrowUpRight size={15}/></button><button className={`connect-button ${liked?'connected':''}`} onClick={onLike}>{liked?<><Check size={15}/> Interested</>:<><Heart size={15}/> I'm interested</>}</button></div>
  </div>
 </article>
}
function Detail({icon:Icon,label,value}){return <div className="detail-item"><span className="detail-icon"><Icon size={16}/></span><div><small>{label}</small><b>{value}</b></div></div>}
function ProfileModal({person:p,onClose,saved,liked,onSave,onLike}){return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="profile-modal"><button className="modal-close" onClick={onClose}><X/></button><div className={`modal-banner ${p.color}`}><div className="person-avatar large">{p.avatar}</div><div><span className="cover-tag">ROOMIEMATCH PROFILE</span><h2>{p.name}, {p.age}</h2><p>{p.course} · {p.year} · {p.college}</p></div><div className="modal-score"><b>{p.compat}%</b><small>fit estimate</small></div></div><div className="modal-content"><p className="modal-bio">{p.bio}</p><div className="detail-grid"><Detail icon={GraduationCap} label="CGPA" value={p.cgpa}/><Detail icon={Wallet} label="Monthly budget" value={`₹${p.budget.toLocaleString('en-IN')}`}/><Detail icon={MapPin} label="From" value={p.city}/><Detail icon={BedDouble} label="Room preference" value={p.area}/><Detail icon={Moon} label="Sleep schedule" value={p.sleep}/><Detail icon={Sparkles} label="Cleanliness" value={p.clean}/><Detail icon={Coffee} label="Study environment" value={p.study}/><Detail icon={Users} label="Guests" value={p.guests}/><Detail icon={Cigarette} label="Smoking" value={p.smoke}/><Detail icon={Wine} label="Drinking" value={p.drink}/><Detail icon={Sun} label="Food preference" value={p.food}/><Detail icon={Music2} label="Noise level" value={p.noise}/></div><div className="modal-section"><h4>Interests</h4><div className="tag-list">{p.interests.map(x=><span key={x}>{x}</span>)}</div></div><div className="modal-section"><h4>More about living together</h4><div className="detail-grid"><Detail icon={CalendarDays} label="Daily routine" value={p.schedule}/><Detail icon={Sun} label="AC preference" value={p.ac}/></div></div><div className="modal-actions"><button className="outline-button" onClick={onSave}><Bookmark size={16}/>{saved?'Saved':'Save profile'}</button><button className="connect-button" onClick={onLike}><Heart size={16}/>{liked?'Interested':'I’m interested'}</button></div><p className="demo-note">Demo profile: details are illustrative, not verified identity or academic records.</p></div></div></div>}
function ProfilePage({profile:p,setEditing}){return <div className="own-profile"><div className="own-profile-top"><div className="own-avatar">YN</div><div><h2>{p.name}</h2><p>{p.course} · {p.year} · {p.age} years</p><span className="profile-status"><span className="live-dot"/> Profile preview</span></div><button className="primary-button" onClick={setEditing}>Edit profile</button></div><div className="own-grid"><div className="own-box"><h3>Academic & budget</h3><Detail icon={GraduationCap} label="CGPA" value={p.cgpa||'Not added'}/><Detail icon={Wallet} label="Monthly budget" value={`₹${Number(p.budget||0).toLocaleString('en-IN')}`}/><Detail icon={MapPin} label="Hometown" value={p.city||'Not added'}/></div><div className="own-box"><h3>Roommate lifestyle</h3><Detail icon={Moon} label="Sleep schedule" value={p.sleep}/><Detail icon={Sparkles} label="Cleanliness" value={p.clean}/><Detail icon={Coffee} label="Study environment" value={p.study}/><Detail icon={Cigarette} label="Smoking" value={p.smoke}/><Detail icon={Wine} label="Drinking" value={p.drink}/></div><div className="own-box full"><h3>Interests & about me</h3><div className="tag-list">{p.interests.map(x=><span key={x}>{x}</span>)}</div><p className="bio">{p.bio||'Add a short introduction so potential roommates can get to know you.'}</p></div></div></div>}
function EditModal({profile:p,setProfile,onClose,onSave}){const set=(k,v)=>setProfile(old=>({...old,[k]:v}));const toggle=(v)=>set('interests',p.interests.includes(v)?p.interests.filter(x=>x!==v):[...p.interests,v]);return <div className="modal-backdrop"><div className="edit-modal"><div className="edit-head"><div><span className="eyebrow">MAKE IT YOURS</span><h2>Build your roommate profile</h2><p>Honest details make for better matches. You control what you share.</p></div><button className="modal-close" onClick={onClose}><X/></button></div><div className="edit-form">
 <div className="form-section"><h3>About you</h3><div className="form-grid"><Field label="Full name" value={p.name} onChange={v=>set('name',v)}/><Field label="Age" value={p.age} onChange={v=>set('age',v)} type="number"/><Field label="Course / branch" value={p.course} onChange={v=>set('course',v)}/><SelectField label="Academic year" value={p.year} onChange={v=>set('year',v)} options={['1st year','2nd year','3rd year','4th year','Postgraduate']}/><Field label="CGPA (out of 10)" value={p.cgpa} onChange={v=>set('cgpa',v)} type="number"/><Field label="Monthly room budget (₹)" value={p.budget} onChange={v=>set('budget',v)} type="number"/><Field label="Hometown" value={p.city} onChange={v=>set('city',v)}/><SelectField label="Room / location preference" value={p.area} onChange={v=>set('area',v)} options={['On campus','Hostel / nearby','Off-campus apartment','Flexible']}/></div><label className="field-label">A little about you<textarea value={p.bio} onChange={e=>set('bio',e.target.value)} placeholder="Your routine, what you enjoy, what makes you a good roommate..." rows="3"/></label></div>
 <div className="form-section"><h3>Interests</h3><p className="form-help">Choose all that apply.</p><div className="choice-chips">{interestOptions.map(v=><button key={v} className={p.interests.includes(v)?'chosen':''} onClick={()=>toggle(v)}>{p.interests.includes(v)&&<Check size={13}/ >}{v}</button>)}</div></div>
 <div className="form-section"><h3>Living habits & boundaries</h3><p className="form-help">These are useful compatibility signals, not judgments. Select what honestly describes you.</p><div className="form-grid">
 <SelectField label="Sleep schedule" value={p.sleep} onChange={v=>set('sleep',v)} options={['Early sleeper','Night owl','Flexible']}/>
 <SelectField label="Cleanliness" value={p.clean} onChange={v=>set('clean',v)} options={['Very tidy','Moderately tidy','Relaxed']}/>
 <SelectField label="Study environment" value={p.study} onChange={v=>set('study',v)} options={['Quiet focus','Music is okay','Study together','Flexible']}/>
 <SelectField label="Smoking" value={p.smoke} onChange={v=>set('smoke',v)} options={['Never','Occasionally','Regularly','Prefer not to say']}/>
 <SelectField label="Drinking" value={p.drink} onChange={v=>set('drink',v)} options={['Never','Socially','Occasionally','Regularly','Prefer not to say']}/>
 <SelectField label="Food preference" value={p.food} onChange={v=>set('food',v)} options={['Vegetarian','Eggetarian','Non-vegetarian','Vegan','No preference']}/>
 <SelectField label="Guests / visitors" value={p.guests} onChange={v=>set('guests',v)} options={['Rarely','Sometimes','Often','Discuss first']}/>
 <SelectField label="Noise tolerance" value={p.noise} onChange={v=>set('noise',v)} options={['Low','Moderate','High']}/>
 <SelectField label="AC preference" value={p.ac} onChange={v=>set('ac',v)} options={['Prefer AC','Prefer fan','No preference']}/>
 <SelectField label="Daily routine" value={p.schedule} onChange={v=>set('schedule',v)} options={['Morning person','Mostly evenings','Late evenings','Balanced','Flexible']}/>
 </div></div>
 </div><div className="edit-footer"><span><ShieldCheck size={15}/> You can edit or remove these details anytime.</span><div><button className="outline-button" onClick={onClose}>Cancel</button><button className="primary-button" onClick={onSave}>Save profile <Check size={16}/></button></div></div></div></div>}
function Field({label,value,onChange,type='text'}){return <label className="field-label">{label}<input type={type} value={value} onChange={e=>onChange(e.target.value)} /></label>}
function SelectField({label,value,onChange,options}){return <label className="field-label">{label}<select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select></label>}
export default App;