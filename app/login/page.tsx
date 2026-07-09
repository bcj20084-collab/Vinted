import { LoginForm } from "./login-form";
export default function LoginPage() {
  return <main className="grid min-h-dvh place-items-center p-4">
    <section className="card w-full max-w-md p-6 md:p-8">
      <div className="mb-7"><span className="text-sm font-bold text-mint">VINTED TRACKER</span><h1 className="mt-2 text-3xl font-black">Bine ai revenit</h1><p className="mt-2 text-slate-600">Urmărește inventarul și profitul de oriunde.</p></div>
      <LoginForm />
    </section>
  </main>;
}
