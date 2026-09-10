"use client";

import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Flower2, LockKeyhole, UserRound } from "lucide-react";
import { cn, usernameToEmail } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type UniformMap = Record<string, { value: unknown }>;

function DotShader({ reverse = false }: { reverse?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const uniforms = useMemo<UniformMap>(() => ({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(size.width * 2, size.height * 2) },
    u_reverse: { value: reverse ? 1 : 0 },
  }), [size.width, size.height, reverse]);

  useFrame(({ clock }) => {
    const material = ref.current?.material as THREE.ShaderMaterial | undefined;
    if (material) material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return <mesh ref={ref}>
    <planeGeometry args={[2, 2]} />
    <shaderMaterial
      glslVersion={THREE.GLSL3}
      transparent
      blending={THREE.AdditiveBlending}
      uniforms={uniforms}
      vertexShader={`in vec3 position; out vec2 vUv; void main(){vUv=position.xy*.5+.5;gl_Position=vec4(position,1.0);}`}
      fragmentShader={`precision mediump float; in vec2 vUv; out vec4 fragColor; uniform float u_time; uniform vec2 u_resolution; uniform int u_reverse;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      void main(){vec2 px=vUv*u_resolution;float cell=22.0;vec2 id=floor(px/cell);vec2 gv=fract(px/cell)-.5;float d=length(gv);float rnd=hash(id);float wave=distance(id,floor(u_resolution/cell*.5))*.025;float t=u_time*.72-wave-rnd*.55;float reveal=u_reverse==1?1.0-smoothstep(0.0,.65,t):smoothstep(0.0,.65,t);float dot=1.0-smoothstep(.09,.18,d);vec3 a=vec3(.93,.35,.58);vec3 b=vec3(1.0,.74,.84);vec3 color=mix(a,b,rnd);fragColor=vec4(color,dot*reveal*(.18+rnd*.5));}`}
    />
  </mesh>;
}

export function CanvasRevealEffect({ reverse = false }: { reverse?: boolean }) {
  return <div className="absolute inset-0"><Canvas dpr={[1, 1.5]}><DotShader reverse={reverse} /></Canvas><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(38,11,24,.30),#160b12_75%)]" /></div>;
}

type AuthMode = "login" | "register";
export interface SignInPageProps { className?: string; mode?: AuthMode; }

export function SignInPage({ className, mode = "login" }: SignInPageProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const isRegister = mode === "register";

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setError("");
    const clean = username.trim().toLowerCase();
    if (!/^[a-z0-9_]{3,20}$/.test(clean)) return setError("Username harus 3–20 karakter: huruf, angka, atau underscore.");
    if (password.length < 6) return setError("Password minimal 6 karakter.");
    if (isRegister && password !== confirm) return setError("Konfirmasi password tidak sama.");
    setLoading(true);
    try {
      const supabase = createClient();
      const email = usernameToEmail(clean);
      if (isRegister) {
        const { error: authError } = await supabase.auth.signUp({ email, password, options: { data: { username: clean } } });
        if (authError) throw authError;
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
      }
      setSuccess(true); setTimeout(() => router.push("/dashboard"), 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.");
    } finally { setLoading(false); }
  }

  return <div className={cn("relative min-h-screen overflow-hidden bg-[#160b12] text-white", className)}>
    <CanvasRevealEffect reverse={success} />
    <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-wony-500/15 blur-3xl" />
    <header className="absolute left-1/2 top-5 z-20 flex w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-white/[.055] px-5 py-3 backdrop-blur-xl">
      <Link href="/login" className="flex items-center gap-2 font-bold tracking-[.14em]"><span className="grid h-8 w-8 place-items-center rounded-full bg-white text-wony-500"><Flower2 size={17}/></span>WONY</Link>
      <div className="flex items-center gap-2 text-sm"><span className="hidden text-white/45 sm:block">{isRegister ? "Sudah punya akun?" : "Belum punya akun?"}</span><Link href={isRegister ? "/login" : "/register"} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 transition hover:bg-white hover:text-[#28121d]">{isRegister ? "Masuk" : "Daftar"}</Link></div>
    </header>
    <main className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-10 pt-28">
      <AnimatePresence mode="wait">
        {!success ? <motion.section key={mode} initial={{opacity:0,x:isRegister?70:-70}} animate={{opacity:1,x:0}} exit={{opacity:0,y:-30}} transition={{duration:.48,ease:[.2,.8,.2,1]}} className="w-full max-w-[410px]">
          <div className="mb-8 text-center"><p className="mb-3 text-[10px] font-bold uppercase tracking-[.28em] text-wony-300">Sakura Realm Access</p><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{isRegister ? "Buat akun WONY" : "Selamat datang"}</h1><p className="mt-3 text-sm leading-6 text-white/50">{isRegister ? "Daftar hanya dengan username dan password." : "Masuk menggunakan username dan password."}</p></div>
          <form onSubmit={submit} className="space-y-4">
            <label className="group flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[.055] px-4 backdrop-blur-md transition focus-within:border-wony-300/60 focus-within:bg-white/[.08]"><UserRound size={18} className="text-white/35 group-focus-within:text-wony-300"/><input value={username} onChange={e=>setUsername(e.target.value)} autoComplete="username" placeholder="Username" className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-white/25" /></label>
            <label className="group flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[.055] px-4 backdrop-blur-md transition focus-within:border-wony-300/60 focus-within:bg-white/[.08]"><LockKeyhole size={18} className="text-white/35 group-focus-within:text-wony-300"/><input value={password} onChange={e=>setPassword(e.target.value)} type={show?"text":"password"} autoComplete={isRegister?"new-password":"current-password"} placeholder="Password" className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-white/25"/><button type="button" onClick={()=>setShow(v=>!v)} className="grid h-11 w-11 place-items-center text-white/35" aria-label={show?"Sembunyikan password":"Tampilkan password"}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></label>
            {isRegister && <label className="group flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[.055] px-4 backdrop-blur-md transition focus-within:border-wony-300/60"><LockKeyhole size={18} className="text-white/35"/><input value={confirm} onChange={e=>setConfirm(e.target.value)} type={show?"text":"password"} autoComplete="new-password" placeholder="Ulangi password" className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-white/25"/></label>}
            {error && <motion.p initial={{opacity:0,y:-5}} animate={{opacity:1,y:0}} className="rounded-xl border border-red-300/15 bg-red-400/10 px-4 py-3 text-sm text-red-100" role="alert">{error}</motion.p>}
            <button disabled={loading} className="group relative h-14 w-full overflow-hidden rounded-2xl bg-white font-bold text-[#301722] transition hover:-translate-y-0.5 disabled:opacity-60"><span className="relative z-10">{loading ? "Memproses..." : isRegister ? "Buat akun" : "Masuk ke WONY"}</span><span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-wony-100 to-transparent transition-all duration-700 group-hover:left-[120%]" /></button>
          </form>
          <p className="mt-7 text-center text-xs leading-5 text-white/35">Dengan melanjutkan, kamu menyetujui aturan komunitas dan kebijakan keamanan WONY.</p>
        </motion.section> : <motion.section key="success" initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} className="text-center"><div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-white text-wony-500 shadow-[0_0_80px_rgba(239,133,170,.45)]"><Flower2 size={34}/></div><h1 className="text-4xl font-bold">Berhasil!</h1><p className="mt-3 text-white/50">Membuka dashboard...</p></motion.section>}
      </AnimatePresence>
    </main>
  </div>;
}
