window.addItem =
function(item, amount=1) {

  const found =
  gameState.inventory.find(
    i => i.item === item
  );

  if(found) {

    found.amount += amount;

  } else {

    gameState.inventory.push({
      item,
      amount
    });

  }

};
