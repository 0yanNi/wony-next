"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Box, CalendarDays, ChevronRight, CircleDollarSign, Crown, Dice5, Flower2, Gift, History, Home, Leaf, Menu, PackageOpen, Search, Settings, ShieldCheck, ShoppingBag, Store, Ticket, Trophy, UserRound, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  ["/dashboard","Home",Home],["/inventory","Inventory",ShoppingBag],["/market","Marketplace",Store],["/topup","Top Up",CircleDollarSign],["/plant","Tanam Coins",Leaf],["/quests","Quest",Ticket],["/events","Event",CalendarDays],["/roles","Buy Role",Crown],["/assets","Buy Assets",Box],["/redeem","Redeem",Gift],["/leaderboard","Peringkat",Trophy],["/history","History",History],["/havefun","Have Fun",Dice5],["/profile","Profil",UserRound],["/notifications","Notifikasi",Bell]
] as const;

export function AppShell({children,rightRail}:{children:React.ReactNode;rightRail?:React.ReactNode}){
  const path=usePathname(); const [open,setOpen]=useState(false);
  return <div className={cn("mx-auto grid min-h-screen max-w-[1600px] bg-white",rightRail?"lg:grid-cols-[220px_minmax(0,1fr)_290px]":"lg:grid-cols-[220px_minmax(0,1fr)]")}>
    {open&&<button aria-label="Tutup menu" className="fixed inset-0 z-40 bg-black/25 lg:hidden" onClick={()=>setOpen(false)}/>} 
    <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[240px] -translate-x-full flex-col border-r bg-white px-4 py-6 transition-transform lg:static lg:w-auto lg:translate-x-0",open&&"translate-x-0")}>
      <div className="mb-7 flex items-center justify-between px-2"><Link href="/dashboard" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-wony-100 text-wony-500"><Flower2/></span><span><b className="block tracking-[.12em]">WONY</b><small className="text-[9px] font-bold tracking-[.2em] text-wony-500">SAKURA REALM</small></span></Link><button className="lg:hidden" onClick={()=>setOpen(false)}><X/></button></div>
      <div className="mb-5 overflow-hidden rounded-xl bg-gradient-to-r from-wony-400 to-wony-300 p-px shadow-soft"><div className="relative flex h-12 items-center justify-center gap-2 rounded-[11px] bg-wony-400 text-xs font-bold text-white"><Flower2 size={17}/> BLOOM REALM<span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/25 [animation:shimmer_4s_infinite]"/></div></div>
      <nav className="scrollbar-none flex-1 space-y-1 overflow-y-auto pr-1">{nav.map(([href,label,Icon])=><Link key={href} href={href} onClick={()=>setOpen(false)} className={cn("flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-zinc-500 transition hover:translate-x-1 hover:bg-wony-50 hover:text-wony-600",path===href&&"bg-wony-50 font-semibold text-wony-600")}><Icon size={18}/>{label}</Link>)}<div className="my-3 border-t"/><Link href="/admin" className={cn("flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-zinc-500 hover:bg-wony-50",path==="/admin"&&"bg-wony-50 text-wony-600")}><ShieldCheck size={18}/>Panel Admin</Link></nav>
      <div className="mt-4 flex items-center gap-2 px-3 text-xs text-zinc-400"><i className="h-2 w-2 rounded-full bg-green-500 ring-4 ring-green-50"/>Server Online</div>
    </aside>
    <section className="min-w-0 bg-[#fffdfE] pb-24 lg:pb-0"><header className="sticky top-0 z-30 flex h-[78px] items-center gap-3 border-b bg-white/85 px-4 backdrop-blur-xl sm:px-6"><button className="grid h-11 w-11 place-items-center rounded-xl border lg:hidden" onClick={()=>setOpen(true)} aria-label="Buka menu"><Menu size={20}/></button><label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-xl border bg-white px-4 text-zinc-400"><Search size={18}/><input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Cari fitur, item, atau pemain..."/></label><Link href="/notifications" className="grid h-11 w-11 place-items-center rounded-xl border border-wony-200 bg-wony-50 text-wony-500"><Bell size={18}/></Link><Link href="/profile" className="hidden items-center gap-2 rounded-xl border px-2 py-1.5 sm:flex"><span className="grid h-8 w-8 place-items-center rounded-lg bg-wony-300 text-xs font-bold text-white">MR</span><span className="pr-2 text-left"><b className="block text-[11px]">Muhammad Royani</b><small className="block text-[9px] text-zinc-400">Sakura Keeper</small></span><ChevronRight size={14} className="text-zinc-300"/></Link></header>{children}</section>
    {rightRail&&<aside className="hidden border-l bg-white lg:block">{rightRail}</aside>}
    <nav className="fixed bottom-3 left-3 right-3 z-40 grid h-16 grid-cols-5 rounded-2xl border bg-white/90 p-1.5 shadow-soft backdrop-blur-xl lg:hidden">{[["/dashboard","Home",Home],["/inventory","Bag",PackageOpen],["/plant","Play",Flower2],["/market","Market",Store],["/profile","Profil",UserRound]].map(([href,label,Icon]:any)=><Link key={href} href={href} className={cn("grid place-items-center text-[9px] text-zinc-400",path===href&&"text-wony-500")}><Icon size={19}/><span>{label}</span></Link>)}</nav>
  </div>
}
