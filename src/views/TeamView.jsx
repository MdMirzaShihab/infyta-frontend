import PageHeader from "@/components/PageHeader";
import AdvisorBand from "@/components/AdvisorBand";
import Schedule from "@/components/Schedule";
import { expertise } from "@/content/expertise";
import { expertiseIntro } from "@/content/pages";

export default function TeamView() {
  return (
    <>
      <PageHeader title="Our Dream Team" lede="The brilliant minds powering Infyta's innovative solutions" />
      <AdvisorBand headings cta={false} />
      <section className="band band--tint" id="expertise">
        <div className="wrap">
          <div className="head">
            <h2>Our Core Expertise</h2>
            <p>{expertiseIntro}</p>
          </div>
          <Schedule rows={expertise} caption="Core expertise, technologies and certifications" />
        </div>
      </section>
    </>
  );
}
