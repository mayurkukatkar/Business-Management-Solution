import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex h-14 items-center px-4 lg:px-6">
                <Link className="flex items-center justify-center" href="#">
                    <span className="font-bold">Mayur CRM</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
                        Login
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
                        Register
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Manage Your Business with Ease
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                                    The all-in-one CRM solution for tracking leads, managing tasks, and growing your revenue.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href="/register">
                                    <Button className="bg-white text-black hover:bg-gray-200">Get Started</Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-3">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Lead Tracking</h3>
                                <p className="text-muted-foreground">
                                    Keep track of all your potential customers and never miss an opportunity.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Task Management</h3>
                                <p className="text-muted-foreground">
                                    Organize your daily tasks and ensure your team stays productive.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Invoicing</h3>
                                <p className="text-muted-foreground">
                                    Create and send professional invoices in seconds.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">© 2024 Mayur CRM. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}
