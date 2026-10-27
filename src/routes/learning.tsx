import { createFileRoute } from '@tanstack/react-router';
import { Shell } from '@/components/linguae/shell';
import { LessonList } from '@/components/linguae/lesson-list';
import { pageHead } from '@/lib/meta';
export const Route=createFileRoute('/learning')({head:()=>pageHead('Jalur Belajar','Jelajahi unit bahasa Inggris bertahap dari kosakata dasar sampai kalimat sederhana.'),component:Learning});
function Learning(){return <Shell title="Jalur Belajar"><h1 className="page-title">Selangkah lebih mahir.</h1><p className="subtext mt-2">Perjalanan bahasa Inggrismu dimulai dari sini.</p><div className="max-w-3xl mt-7"><div className="section-heading"><h2>A1 · English foundations</h2><span className="mini-tag">4 LESSON</span></div><LessonList/></div></Shell>}
