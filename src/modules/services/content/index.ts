import * as v from "valibot";

import { assertValid } from "~/platform/kernel";

import { EngagementSchema, QuestionSchema, ServiceSchema } from "../model";
import { engagements, questions, services, servicesIntro, workingFacts } from "./services";

export { engagements, questions, services, servicesIntro, workingFacts };

export function validateServicesContent(): void {
  assertValid(
    "services",
    v.pipe(
      v.object({
        services: v.array(ServiceSchema),
        engagements: v.array(EngagementSchema),
        questions: v.array(QuestionSchema),
      }),
      v.check(
        ({ services: list }) => new Set(list.map((service) => service.id)).size === list.length,
        "Service ids must be unique"
      )
    ),
    { services, engagements, questions }
  );
}

if (import.meta.env.SSR) validateServicesContent();
