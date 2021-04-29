/* globals $0, allRaces:true, races:true, titles:true, copy */
// https://gamewith.jp/uma-musume/article/show/258835
// $0 = <tbody>

allRaces = [...$0.children].map((tr) => {
  try {
    const [
      ,
      sGrade,
      sMonth,
      ofMonth,
    ] = tr.children[0].childNodes[1].nodeValue.match(
      /(\d)年目 (\d{1,2})月(.半)/
    );
    const title = tr.children[1].childNodes[0].textContent;
    const [
      ,
      raceGrade,
      siteName,
    ] = tr.children[1].childNodes[2].textContent.split(" / ");
    const [
      ground,
      distanceDescription,
      direction,
    ] = tr.children[1].childNodes[4].textContent.split(" / ");
    const distance = parseInt(distanceDescription, 10);

    const race = {
      direction,
      distance,
      grade: Number(sGrade),
      ground,
      month: Number(sMonth),
      ofMonth,
      raceGrade,
      title,
      siteName,
    };
    return race;
  } catch (error) {
    return { error, tr };
  }
});

races = allRaces.filter((v) => !v.error);

copy(races);
