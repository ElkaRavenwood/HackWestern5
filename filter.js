var pages = ['hello', 'this', 'has', 'an', '.A.C.R' ,'ACR', 'I²S', '3D', 'PhD'];

function checkAcr(webpage){
    var acrArray = [];
    for(var i = 0; i < webpage.length; i++){
        var acrWord = false;
        word = webpage[i];
        if(word == word.toUpperCase() && word.length > 1){
            acrWord = true;
        }

        for(w = 0; w < word.length-1; w++){
            if(word[w+1] == word[w+1].toUpperCase()){
                acrWord = true;
            }
        }

        if(acrWord){
            for(z = 0; z < word.length; z++){
                word = word.replace('.', '');
            }
            acrArray.push(word);
        }


    }
    console.log(acrArray);
    return acrArray;
}

checkAcr(pages);