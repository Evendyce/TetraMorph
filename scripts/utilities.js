//a is start
//r is the multiplication factor
//n is the term number
function geometricSeriesSum(a, r, n) {
    return a * ((1 - Math.pow(r, n)) / (1 - r));
}

//A function to discover which squares have been missed by the player
//It populates two lists: one for flipped(tlist) and one for unflipped(flist) squares
//----------------------------------------------------------------------
//There are 3 cases to add to either list:
//case I: different value
//case II: playernode has more children than it should
//case III: playernode is missing children that it should have
function doubleTreeRecursion(playernode, gamenode, tlist, flist) {
    if (gamenode.hasValue()) {
        if (playernode.hasValue()) {
            if (playernode.value.flipped !== gamenode.value.flipped) //case I
                addToList(gamenode.value, tlist, flist);
        } else //case II: i.e. playernode has children
        {
            addToList(gamenode.value, tlist, flist);
        }
    } else //gamenode has children
    {
        if (playernode.hasValue()) //case III - recurse through all the missing children and add them using sTR
            gamenode.children.forEach(
                function(x) {
                    singleTreeRecursion(x, tlist, flist);
                });
        else {
            for (var i = 0; i < 4; i++)
                doubleTreeRecursion(playernode.children[i], gamenode.children[i], tlist, flist);
        }
    }
}

function addToList(value, tlist, flist) {
    if (value.flipped)
        tlist.push(value);
    else
        flist.push(value);
}

function singleTreeRecursion(node, tlist, flist) {
    if (node.hasValue())
        addToList(node.value, tlist, flist);
    else
        node.children.forEach(
            function(x) {
                singleTreeRecursion(x, tlist, flist);
            });
}

var screens = ["gamestart", "gameover", "paused", "seed"];
function switchToScreen(screenNumber) {
    for (var i = 0; i < screens.length; i++) {
        document.getElementById(screens[i]).style.display = (i === screenNumber) ? "block" : "none";
    }
}

module.exports.switchToScreen = switchToScreen;
module.exports.doubleTreeRecurstion = doubleTreeRecursion;
module.exports.geometricSeriesSum = geometricSeriesSum ;
