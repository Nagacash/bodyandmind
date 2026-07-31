import React from 'react';
import { TEAM_MEMBERS } from '../data/teamData';
import { PillarType } from '../types';
import { PageHero } from '../components/ui/PageHero';
import { SectionLabel } from '../components/ui/SectionLabel';
import { GlassPanel } from '../components/ui/GlassPanel';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { CtaBanner } from '../components/ui/CtaBanner';

interface TeamPageProps {
  onOpenBooking: (pillar?: PillarType, optionName?: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="page-section-gap page-shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-body">
      <PageHero
        badge="EXPERTEN & BETREUUNG"
        title="UNSER TEAM – Persönlich. Qualifiziert. An deiner Seite."
        description="Hinter body & mind steht ein erfahrenes Team aus Trainern, Coaches und Therapeuten — für maßgeschneiderte 1:1-Begleitung in Hamburg Rothenbaum."
        imageSrc="/images/lind3.webp"
        imageAlt="Team body & mind by Natalie Zimmermann"
      />

      <div className="space-y-10 sm:space-y-14">
        {TEAM_MEMBERS.map((member, index) => {
          const imageFirst = index % 2 === 0;

          return (
            <RevealOnScroll key={member.id}>
              <GlassPanel className="p-6 sm:p-10 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  <div className={`lg:col-span-5 ${imageFirst ? '' : 'lg:order-2'}`}>
                    <ImagePlaceholder
                      src={member.imageSrc}
                      alt={`${member.name} – Team body & mind`}
                      aspectRatio="3/4"
                      objectFit="cover"
                      showBadge={false}
                    />
                  </div>

                  <div className={`lg:col-span-7 space-y-4 ${imageFirst ? '' : 'lg:order-1'}`}>
                    <SectionLabel>Team</SectionLabel>
                    <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
                      {member.name}
                    </h2>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted leading-relaxed font-light">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </RevealOnScroll>
          );
        })}
      </div>

      <RevealOnScroll>
        <CtaBanner
          title="Lerne uns persönlich kennen"
          description="Im Erstgespräch finden wir heraus, welches Team-Mitglied und welches Programm am besten zu dir passt."
          buttonLabel="Erstgespräch vereinbaren"
          onClick={() => onOpenBooking('GENERAL')}
        />
      </RevealOnScroll>
    </div>
  );
};
