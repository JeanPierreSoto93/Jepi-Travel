import { clients, type ClientConfig } from "@/config/clients";

export function getCurrentClient(): ClientConfig {
  // First try to get client from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const clientFromUrl = urlParams.get('agency');
  if (clientFromUrl && clients[clientFromUrl]) {
    return clients[clientFromUrl];
  }

  // Then try to match domain
  const currentDomain = window.location.hostname;
  for (const [clientId, config] of Object.entries(clients)) {
    if (config.domain.some(domain => 
      currentDomain === domain || 
      currentDomain.endsWith(`.${domain}`)
    )) {
      return config;
    }
  }

  // Default to jepitravel if no match found
  return clients.jepitravel;
}

export function getClientTheme(): ClientConfig['theme'] {
  return getCurrentClient().theme;
}

export function getClientFeatures(): ClientConfig['features'] {
  return getCurrentClient().features;
}

export function getClientContent(): ClientConfig['content'] {
  return getCurrentClient().content;
}
