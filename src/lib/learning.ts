export type Progress = { xp: number; coins: number; hearts: number; completed: number[]; mistakes: number[]; inventory: string[]; streak: number; lastStudy: string; name: string };
export const initialProgress: Progress = { xp:320, coins:250, hearts:5, completed:[], mistakes:[], inventory:[], streak:7, lastStudy:'2026-10-11', name:'Intan Maharani' };
export const lessons = [
 {id:0,title:'Hello, world!',description:'Sapaan dan perkenalan dalam bahasa Inggris',unit:'UNIT 1 · BASIC VOCABULARY',icon:'hello',duration:'5 menit',xp:30},
 {id:1,title:'Things around you',description:'Kenali benda-benda di sekitarmu',unit:'UNIT 1 · BASIC VOCABULARY',icon:'book',duration:'7 menit',xp:40},
 {id:2,title:'Everyday conversations',description:'Ungkapan sederhana untuk keseharian',unit:'UNIT 2 · DAILY EXPRESSIONS',icon:'chat',duration:'8 menit',xp:50},
 {id:3,title:'Build your first sentence',description:'Mulai menyusun kalimat sederhana',unit:'UNIT 3 · BASIC GRAMMAR',icon:'pen',duration:'8 menit',xp:50}
];
export const questions = [
 {type:'choice',prompt:'Apa bahasa Inggris dari “Selamat pagi”?',options:['Good night','Good morning','Goodbye','Thank you'],answer:'Good morning',explanation:'“Good morning” digunakan untuk menyapa di pagi hari. “Good night” biasanya diucapkan sebelum tidur.'},
 {type:'fill',prompt:'Lengkapi kalimat perkenalan ini.',sentence:'Hello! My ___ is Intan.',options:['name','hello','morning','you'],answer:'name',explanation:'“My name is …” berarti “Nama saya …”. Gunakan “name” untuk memperkenalkan nama.'},
 {type:'order',prompt:'Susun kata menjadi sapaan yang benar.',options:['you','How','?','are'],answer:'How are you ?',explanation:'Urutan yang tepat adalah “How are you?” yang berarti “Apa kabar?”.'},
 {type:'match',prompt:'Pasangkan “Thank you” dengan artinya.',options:['Sampai jumpa','Terima kasih','Selamat malam','Maaf'],answer:'Terima kasih',explanation:'“Thank you” berarti “Terima kasih”, digunakan untuk menunjukkan rasa syukur.'}
];
export const lessonQuestions = (id:number) => id===0 ? questions : [
 {type:'choice',prompt:'Apa bahasa Inggris dari “Buku”?',options:['Book','Table','Chair','Door'],answer:'Book',explanation:'“Book” berarti buku, sedangkan “table” adalah meja dan “chair” adalah kursi.'},
 {type:'fill',prompt:'Lengkapi kalimat berikut.',sentence:'This is a ___. (meja)',options:['book','table','door','window'],answer:'table',explanation:'“This is a table” berarti “Ini adalah sebuah meja”.'},
 {type:'order',prompt:'Susun kata menjadi kalimat yang benar.',options:['book','a','is','This'],answer:'This is a book',explanation:'Susunan kalimat: subjek “This”, kata kerja “is”, lalu “a book”.'},
 {type:'match',prompt:'Pasangkan “Window” dengan artinya.',options:['Pintu','Jendela','Kursi','Buku'],answer:'Jendela',explanation:'“Window” berarti jendela. “Door” berarti pintu.'}
];
export function loseHeart(p:Progress,question:number):Progress { return {...p,hearts:Math.max(0,p.hearts-1),mistakes:Array.from(new Set([...p.mistakes,question]))}; }
export function canStart(p:Progress,id:number) { return id===0 || p.completed.includes(id-1); }
export function completeLesson(p:Progress,id:number,date:string):Progress { const fresh=!p.completed.includes(id); const yesterday=new Date(`${date}T12:00:00Z`);yesterday.setUTCDate(yesterday.getUTCDate()-1); return {...p,xp:p.xp+(fresh?(lessons[id]?.xp??30):10),coins:p.coins+(fresh?20:5),completed:Array.from(new Set([...p.completed,id])),lastStudy:date,streak:p.lastStudy===date?p.streak:p.lastStudy===yesterday.toISOString().slice(0,10)?p.streak+1:1}; }
export function buyItem(p:Progress,id:string,price:number):Progress { if(p.coins<price || (id!=='hearts'&&p.inventory.includes(id)))return p; return {...p,coins:p.coins-price,hearts:id==='hearts'?5:p.hearts,inventory:id==='hearts'?p.inventory:[...p.inventory,id]}; }
