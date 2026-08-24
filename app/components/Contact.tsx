import { SocialIcon } from "react-social-icons";
import { ContactForm } from "./client/forms/ContactForm";

export const Contact = () => {
  return (
    <section id="Contact" className="w-full py-12 px-6 lg:px-12 bg-amber-600/90">
      <div className="uppercase mb-6 px-4 py-2 rounded-full border border-white/80 text-white/80 font-body font-light text-xs w-fit">Contact</div>
      <article className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 text-white/80">
        <div>
          <h2 className="text-4xl leading-10 mt-2 max-w-md mb-12 text-blue-950/90 font-bold">Get in touch with us to start your journey in learning <span className="text-white/80">Spanish</span></h2>
          <p className="text-sm font-body mb-2">Reach us on:</p>
          <div className="flex gap-2">
            <SocialIcon
              url="https://www.facebook.com/ricospanishacademy"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
            <SocialIcon
              url="https://www.tiktok.com/@academiadeespanolrico"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
            <SocialIcon
              url="mailto:ricospanishacademy@gmail.com"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
            <SocialIcon
              url="https://wa.me/639206126888"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
          </div>
        </div>
        <ContactForm />
      </article>
    </section>
  )
}