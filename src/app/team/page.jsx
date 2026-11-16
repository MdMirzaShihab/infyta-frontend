import TeamView from "@/views/TeamView";
import JsonLd from "@/components/JsonLd";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo/metadata";
import { webPage, breadcrumbList, personSchema } from "@/lib/seo/jsonld";
import { chiefAdvisor } from "@/content/team";

export const metadata = pageMetadata(pages.team);

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPage({ ...pages.team, name: pages.team.title }),
          breadcrumbList([{ name: "Home", path: "/" }, { name: "Team", path: "/team" }]),
          personSchema(chiefAdvisor),
        ]}
      />
      <TeamView />
    </>
  );
}
