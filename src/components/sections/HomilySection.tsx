import { getLatestHomilies } from "@/sanity/queries";
import {
  extractVideoId,
  buildEmbedUrl,
  fetchVideoTitle,
  formatTimestamp,
} from "@/lib/youtube";

interface HomilyWithMeta {
  youtubeUrl: string;
  timestamp: number;
  date: string;
  scriptureRef: string | null;
  videoId: string;
  embedUrl: string;
  videoTitle: string;
}

async function enrichHomilies(): Promise<HomilyWithMeta[]> {
  const homilies = await getLatestHomilies(6);
  if (homilies.length === 0) return [];

  const enriched = await Promise.all(
    homilies.map(async (h) => {
      const videoId = extractVideoId(h.youtubeUrl);
      if (!videoId) return null;
      const title = await fetchVideoTitle(h.youtubeUrl);
      return {
        ...h,
        videoId,
        embedUrl: buildEmbedUrl(videoId, h.timestamp),
        videoTitle: title ?? h.date,
      };
    })
  );

  return enriched.filter((h): h is NonNullable<typeof h> => h !== null) as HomilyWithMeta[];
}

export default async function HomilySection({ title }: { title: string }) {
  const homilies = await enrichHomilies();

  return (
    <section className="mb-20">
      <div className="text-center mb-10">
        <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-2">
          {title}
        </h2>
        <p className="text-[16px] leading-[24px] text-on-surface-variant">
          Escucha las homilías de nuestras misas diarias.
        </p>
      </div>

      {homilies.length > 0 ? (
        <>
          {/* Featured — latest homily */}
          <div className="mb-8">
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden soft-shadow border border-outline-variant/20">
              <div className="aspect-video">
                <iframe
                  src={homilies[0].embedUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title={homilies[0].videoTitle}
                />
              </div>
              <div className="p-6">
                <h3 className="font-headline text-[20px] leading-[28px] font-semibold text-primary mb-2">
                  {homilies[0].videoTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    {homilies[0].date}
                  </span>
                  {homilies[0].scriptureRef && (
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      {homilies[0].scriptureRef}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-altar-gold font-semibold">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    Homilía desde {formatTimestamp(homilies[0].timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Previous homilies grid */}
          {homilies.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {homilies.slice(1).map((h) => (
                <div key={h.date} className="bg-surface-container-lowest rounded-xl overflow-hidden soft-shadow border border-outline-variant/20 hover:shadow-md transition-shadow">
                  <div className="aspect-video">
                    <iframe
                      src={h.embedUrl}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      title={h.videoTitle}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-headline text-[16px] leading-[22px] font-semibold text-primary mb-1 line-clamp-2">
                      {h.videoTitle}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span>{h.date}</span>
                      {h.scriptureRef && (
                        <>
                          <span className="text-outline-variant">·</span>
                          <span>{h.scriptureRef}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Placeholder when no homilies in Sanity yet */
        <div className="bg-surface-mist rounded-2xl p-8 md:p-12 border border-outline-variant/20 text-center">
          <span className="material-symbols-outlined text-primary/20 text-[80px] mb-4 block">construction</span>
          <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-3">
            Próximamente
          </h3>
          <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-xl mx-auto mb-6">
            Estamos integrando las homilías de nuestras misas diarias. Pronto podrás ver las reflexiones
            del Padre Héctor directamente aquí. Mientras tanto, visita nuestro canal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.youtube.com/@ParroquiaDeiVerbum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full text-[14px] tracking-[0.05em] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              Ver Misas en YouTube
            </a>
            <a
              href="https://www.facebook.com/parroquiadeiverbumbogota/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-outline-variant text-on-surface-variant px-6 py-3 rounded-full text-[14px] tracking-[0.05em] font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">live_tv</span>
              Ver en Facebook Live
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
