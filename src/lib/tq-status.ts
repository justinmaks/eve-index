export function formatTqPlayerCount(players: number) {
  return new Intl.NumberFormat("en-US").format(players);
}
