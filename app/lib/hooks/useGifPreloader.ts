                // Create a new file: hooks/useGifPreloader.ts
                import { useEffect, useRef } from 'react';

                export const useGifPreloader = (urls: string[], currentIndex: number, lookahead = 2) => {
                  const preloadedRefs = useRef(new Set<string>());
                  
                  useEffect(() => {
                    if (!urls?.length) return;
                    
                    // Preload next N images
                    for (let i = 1; i <= lookahead; i++) {
                      const nextIndex = currentIndex + i;
                      const url = urls[nextIndex];
                      
                      if (url && !preloadedRefs.current.has(url)) {
                        const img = new window.Image();
                        img.src = url;
                        img.onload = () => {
                          preloadedRefs.current.add(url);
                          console.log(`✅ Preloaded GIF ${nextIndex + 1}/${urls.length}`);
                        };
                        img.onerror = () => {
                          console.error(`❌ Failed to preload GIF: ${url}`);
                        };
                      }
                    }
                  }, [urls, currentIndex, lookahead]);
                };

                // In your Quiz component:
                // useGifPreloader(gif_urls, currentIndex, 2); // Preload next 2 GIFs