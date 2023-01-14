import { useQuery } from 'react-query';
import { ServerInfoResponse, ServersResponse } from './types';

export function calculateIncrease(startingValue: number, finalValue: number) {
  const value = ((finalValue - startingValue) / startingValue) * 100;
  return Math.round(value * 10) / 10;
}

export function withServerListDefaults(response: ServersResponse) {
  const defaults = {
    top50servers: [],
    boostedServers: [],
    total: { servers: '', players: '', maxPlayers: '', percentage: '' }
  };

  return response || defaults;
}

export function withServerInfoDefaults(response) {
  const defaults = {
    server: {},
    players: []
  };

  return response || defaults;
}

export function useFetchServers() {
  const { isLoading, error, data } = useQuery<ServersResponse, Error>('servers', () =>
    fetch(process.env.domain + '/api/servers.php?full=1&resolve_host=0').then((res) => res.json())
  );
  const { top50servers, boostedServers, total } = withServerListDefaults(data);
  return { isLoading, error, top50servers, boostedServers, total };
}

export function useFetchServerInfo(id: string, enabled: boolean) {
  const { isLoading, error, data } = useQuery<ServerInfoResponse, Error>(
    ['server-info', id],
    () => fetch(process.env.domain + '/api/server_info.php?id=' + id).then((res) => res.json()),
    { enabled }
  );
  const { server, players } = withServerInfoDefaults(data);
  return { isLoading, error, server, players };
}

export function buildBreadcrumbs(title: string, url: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: title,
        item: process.env.domain + url
      }
    ]
  });
}
