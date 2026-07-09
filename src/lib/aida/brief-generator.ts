import type { AidaBrief, AidaBriefInput, AidaBriefMode } from "./types";
import { getAidaAudience } from "./prompt-builder";

function getTitle(mode: AidaBriefMode) {
  const titles: Record<AidaBriefMode, string> = {
    executive: "Executive Early Action Brief",
    government: "Government Coordination Note",
    humanitarian: "Humanitarian Anticipatory Action Note",
    community: "Community Advisory",
    somali: "Farriin Digniin iyo Tallaabo Hore",
  };

  return titles[mode];
}

function getSomaliRiskLevel(level: string) {
  const levels: Record<string, string> = {
    Low: "mid hoose",
    Moderate: "mid dhexdhexaad ah",
    High: "mid sare",
    Severe: "mid aad u sareeya",
  };

  return levels[level] ?? "mid u baahan taxaddar";
}

function getHeadline(input: AidaBriefInput) {
  if (input.mode === "somali") {
    return `${input.scenario.locationName}: khatartu hadda waa ${getSomaliRiskLevel(
      input.assessment.riskLevel,
    )}, waxaana loo baahan yahay in tallaabo hore la qaado.`;
  }

  return `${input.scenario.locationName} is under ${input.assessment.riskLevel.toLowerCase()} climate-livelihood risk with ${input.assessment.operationalMode.toLowerCase()} recommended.`;
}

function getKeyMessage(input: AidaBriefInput) {
  if (input.mode === "somali") {
    return `ARIE waxay muujinaysaa in roob-yaraan, cadaadis biyo, iyo culays nololeed ay is biirsadeen. Go'aanka lagu taliyay waa in la dardargeliyo isku-duwidda degmada, lana gaadhsiiyo bulshada fariimo fudud oo la fahmi karo.`;
  }

  if (input.mode === "community") {
    return `Climate and livelihood signals are moving in the wrong direction. Communities should receive simple advisories now so they can prepare water, pasture, planting, livestock movement, and household decisions before conditions worsen.`;
  }

  if (input.mode === "government") {
    return `ARIE recommends district-level anticipatory coordination because climate stress, exposure, and coping pressure are converging. The priority is to validate affected locations and align government, humanitarian, and community action before households lose options.`;
  }

  if (input.mode === "humanitarian") {
    return `The current risk profile supports early preparedness for water, fodder, livelihood, and cash-response planning. Partners should use the next 24–72 hours to validate priority areas and prepare no-regrets action packages.`;
  }

  return `The risk score is driven by converging climate stress, livelihood exposure, and coping pressure. The recommended decision is actionable, explainable, and suitable for early coordination.`;
}

function getActions(input: AidaBriefInput) {
  if (input.mode === "somali") {
    return [
      "La socodsii bulshada fariimo kooban oo ku saabsan biyaha, daaqa, beerashada, iyo dhaqashada xoolaha.",
      "Hubi xaaladda ceelasha, berkadaha, daaqa, iyo qiimaha suuqa.",
      "Dhallinyarada, odayaasha, iyo idaacadaha deegaanku ha gudbiyaan fariimaha digniinta.",
    ];
  }

  if (input.mode === "community") {
    return [
      "Share simple local advisories through trusted community channels.",
      "Verify water availability, pasture condition, planting status, and local market changes.",
      "Encourage early household decisions before coping pressure increases.",
    ];
  }

  return input.assessment.actionPackages.map(
    (item) =>
      `${item.stakeholder}: ${item.action} (${item.window}, ${item.priority}).`,
  );
}

export function generateAidaBrief(input: AidaBriefInput): AidaBrief {
  return {
    mode: input.mode,
    title: getTitle(input.mode),
    audience: getAidaAudience(input.mode),
    headline: getHeadline(input),
    keyMessage: getKeyMessage(input),
    recommendedActions: getActions(input),
    evidenceBase: input.assessment.evidence.map(
      (item) => `${item.source}: ${item.signal}`,
    ),
    fieldVerification: input.fusion.fieldVerificationNeeds,
    communicationChannels: input.fusion.lastMileChannels,
    closingNote:
      input.mode === "somali"
        ? "Farriintani waa in lagu xaqiijiyaa xogta deegaanka, lana gaadhsiiyo dadka si cad, oo degdeg ah, oo la fahmi karo."
        : "This brief should be validated with field observations and used to support early, coordinated, no-regrets action.",
  };
}