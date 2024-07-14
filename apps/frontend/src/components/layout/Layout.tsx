import Footer from "@/common/Footer";
import Header from "@/common/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    );
}