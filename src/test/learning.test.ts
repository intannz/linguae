import { describe,expect,it } from 'vitest';
import { initialProgress,loseHeart,canStart,completeLesson,buyItem } from '@/lib/learning';
describe('Linguae learning rules',()=>{
 it('starts with maximum 5 hearts and loses exactly one for a wrong answer',()=>{expect(initialProgress.hearts).toBe(5);expect(loseHeart(initialProgress,0).hearts).toBe(4);});
 it('never goes below zero hearts',()=>{expect(loseHeart({...initialProgress,hearts:0},1).hearts).toBe(0);});
 it('locks the next lesson until its prerequisite is completed',()=>{expect(canStart(initialProgress,1)).toBe(false);expect(canStart({...initialProgress,completed:[0]},1)).toBe(true);});
 it('retains incorrect questions for review without duplicates',()=>{expect(loseHeart(loseHeart(initialProgress,2),2).mistakes).toEqual([2]);});
 it('XP is not spent when buying an item with coins',()=>{const p=buyItem({...initialProgress,hearts:1},'hearts',100);expect(p.xp).toBe(320);expect(p.coins).toBe(150);expect(p.hearts).toBe(5);});
 it('does not buy when coins are insufficient',()=>{const p={...initialProgress,coins:99};expect(buyItem(p,'hearts',100)).toEqual(p);});
 it('awards XP and coins after completing a lesson and tracks completion',()=>{const p=completeLesson(initialProgress,0,'2026-10-12');expect(p.xp).toBe(350);expect(p.coins).toBe(270);expect(p.completed).toEqual([0]);});
 it('tracks streak using the last completed date only',()=>{const p=completeLesson(initialProgress,0,'2026-10-12');expect(p.streak).toBe(8);expect(completeLesson(p,0,'2026-10-12').streak).toBe(8);expect(completeLesson(p,1,'2026-10-14').streak).toBe(1);});
});
