export function extractIds<T>(qryArray:{id:T;}[]|null) {
  if(!qryArray) return null;
  const ids = qryArray.reduce<T[]>(
    function(accIds, idObj){

      return accIds.concat(idObj.id);
    }, []
  );
  return ids;
};