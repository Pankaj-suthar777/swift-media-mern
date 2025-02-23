import Contact from "@/components/landing/Contact";
import { GridSmallBackgroundDemo } from "@/components/landing/GridSmallBackgroundDemo";
import Header from "@/components/layout/Header";

const ContactPage = () => {
  return (
    <div>
      <GridSmallBackgroundDemo height="h-[100vh]" heading="Contact Us">
        <div className="absolute top-0 right-0 left-0 mx-10 mt-5">
          <Header />
        </div>
        <Contact />
      </GridSmallBackgroundDemo>
    </div>
  );
};

export default ContactPage;
