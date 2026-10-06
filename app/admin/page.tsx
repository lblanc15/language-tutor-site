import { Form } from "lucide-react"
import Link from "next/link"

const adminFunctions = [
  {
    name: "Contact Submissions",
    route: "/admin/contact-submissions",
    icon: <Form className="h-5 w-5 text-red-800" />,
    subtitle: "View and manage contact form submissions",
  }
]

export default function AdminPage() {
  return (
    <section className="flex flex-wrap gap-4 bg-white mt-6">
      {adminFunctions.map((func, id) => (
        <Link href={func.route} key={id}>
          <div className="rounded-lg shadow-sm border items-center p-4 lg:w-fit hover:bg-slate-50">
            <div className="flex items-center gap-3">{func.icon}
              <div className="leading-3.5">
                <h2 className="font-bold text-blue-950">{func.name}</h2>
                <p className="text-[10px] text-slate-500">{func.subtitle}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}