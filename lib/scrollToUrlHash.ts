export function scrollToUrlHash(path) {
  const [, hashLocation] = path.split('#');
  if (hashLocation) {
    const anchor = document.getElementById(hashLocation);
    if (!anchor) {
      return;
    }
    const scrollMargin = 100;
    const distanceToScroll = window.pageYOffset + anchor.getBoundingClientRect().top - scrollMargin;
    window.scrollTo(0, distanceToScroll);
  }
}
