import Header from "@/components/base/header/header";

export default function WithNavLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}