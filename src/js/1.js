function getValueToSelect(data) {
  const catsInfo = data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join(' ');
  refs.selectEl.insertAdjacentHTML('beforeend', catsInfo);
  new SlimSelect({
    select: refs.selectEl,
  });
}
