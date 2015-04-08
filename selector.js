/*
    Mòdul 7: Desenvolupament Web en Entorn Client

        Pràctica: Joc puzzle
        Fitxer: selector.js
    Autor: Víctor Alarcón Serrano
    Curs: 2014-2015
    Descripció: Crear un joc d'ordenació d'una imatge utilitzant els events de teclat i jquery.
    Pre-condicions: Utilitzar events.
    Post-condicions: -

Comprovat el seu funcionaent en navegadors Chrome i Firefox.

*/

//Variables globals.
var campsText=0;
var x=0;
var y=0;
var constX=0;
var constY=0;
var flag=false;

var count = 0;
var counter = setInterval(timer, 10);

var rows = 4;
var columns = 4;

var imatges = new Array();

image = {
    src:null,
    xC:null,
    yC:null
}

//Primera funció encarregada d'eliminar el contingut anteior, i de
//posar-ne el nou.
function changeImg(src){
	if(!flag){
		resetCamp(document.getElementById("cells"));
		afegirCamps(document.getElementById("cells"),src);
	}
}

function afegirCamps(contenidor,src){
    
		//Secció del codi que genera els src de totes les imatges a partir
		//de la imatge-opció.

    var ruta = new Array();
    var j = 0;
    var ext = src.match(/\.[^/.]+$/);

    for (var i = 0; i < rows; i++) {
	    for (var e = 0; e < columns; e++) {
	        ruta.push(src.replace(/\.[^/.]+$/,"-"+i+"-"+e)+ext);
	    }
		}

		for (var i = 0; i < ruta.length/rows; i++) {
		    for (var e = 0; e < ruta.length/columns; e++) {
		        imatges.push({
		            xC: i,
		            yC: e
		        });
		    }
		}

		for (var i = 0; i < ruta.length; i++) {
		    imatges[i].src=ruta[i];
		}

		//Creació de les imatges.
    crearImg(ruta,contenidor);

    //Funció que barreja totes les imatges.
    
    shuffle();
    
    //Descomentar aquesta secció i comentar el shuffle, per mostrar la
    //imatge ordenada per defecte.
    /*
    getCell(0,3).addClass("focus");
    x=0;
    y=3;
	*/

		//Posicionament de cada una de les imatges mitjançant la funcio initial,
		//que coloca les imatges en un eix absolut x/y.
    for (var i = 0; i < ruta.length/rows; i++) {
        for (var e = 0; e < ruta.length/columns; e++) {
            initial(i,e);
        }
    }
	
}

//Funció generica. Modificada per la ocasió.
function crearImg(src, contenidor, x, y, classe, alt){

    for(var i = 0; i<src.length; i++){
        
        var inputImg=document.createElement('img');

        if(typeof src==='undefined'||typeof src[i]==='undefined'||typeof src[i]==='undefined' || src[i]==null){
            return 0;
        }else inputImg.src=src[i];
        
        if(typeof classe==='undefined'||typeof classe[i]==='undefined'||typeof classe[i]==='undefined' || classe[i]==null) {
            inputImg.className="img_"+campsText;
        }else inputImg.className=classe[i];

        if(typeof x==='undefined'||typeof x[i]==='undefined'||typeof x[i]==='undefined' || x[i]==null) {
            if(constY==rows){
                constX++;
                constY=0;
            }
            inputImg.setAttribute("xc", constX);
            inputImg.setAttribute("x", constX);
        }else {
            inputImg.setAttribute("xc", x[i]);
            inputImg.setAttribute("x", x[i]);
        }

        if(typeof y==='undefined'||typeof y[i]==='undefined'||typeof y[i]==='undefined' || y[i]==null) {
            inputImg.setAttribute("yc", constY);
            inputImg.setAttribute("y", constY);
            constY++;
        }else {
            inputImg.setAttribute("yc", y[i]);
            inputImg.setAttribute("y", y[i]);
        }

        if(typeof alt==='undefined'||typeof alt[i]==='undefined'||typeof alt[i]==='undefined' || alt[i]==null) {
            inputImg.alt="input_"+campsText;
        }else inputImg.alt = alt[i];
        
        campsText++;
        contenidor.appendChild(inputImg);
    }
}

function shuffle(){
    
    var rand = 0;

    for(var i=0;i<rows;i++){
        for(var e=0;e<columns;e++){
            do{
                rand = Math.floor((Math.random() * imatges.length));
            }while(imatges[rand].src=="");

            getCell(i,e).attr({src:imatges[rand].src});
            getCell(i,e).attr({xC:imatges[rand].xC});
            getCell(i,e).attr({yC:imatges[rand].yC});  

            imatges[rand].src="";

            //Fa que la imatge transparent sigui sempre la de inici de partida.
            if(rand == 3){
                //getCell(i,e).addClass("focus");
                x=i;
                y=e;
                getCell(i,e).addClass("focus");  
            }
        }
    }
}

//Funció que comprova si es guanya, i si es així aplica els canvis.
function checkWin(){
    var wins=0;
    for(var i=0;i<rows;i++){
        for(var e=0;e<columns;e++){
            if(getCell(i,e).attr("x")==getCell(i,e).attr("xc")&&getCell(i,e).attr("y")==getCell(i,e).attr("yc")){
                wins++;   
            }else break
        }
    }
    if(wins==rows*columns){
        $("#win").css({"top":"0%"});
        $(".focus").css({"opacity":"1"});
        $("#timer").css({
        	"background-color": "rgba(39, 174, 96,.7)",
        	"color":"white"
        });
        flag=true;
    }
}

var movent=false;

//Event de captura de les tecles del taclat.
$(document).keydown(function(e) {
    if (movent) return;//si estic en moviment no capturo res
	if(!flag){
	    switch(e.which) {
	        case 37: // esquerra
	            if(y>0){
	                coords(x,y,3);
	                y--;
	            } 
	        break;

	        case 38: // amunt
	            if(x>0){
	                coords(x,y,0);
	                x--;
	            } 
	        break;

	        case 39: // dreta
	            if(y<columns-1) {
	                coords(x,y,1);
	                y++;
	            }
	        break;

	        case 40: // abaix
	            if(x<rows-1) {
	                coords(x,y,2);
	                x++;
	            }
	        break;
	    }
	    e.preventDefault(); 
    }
});

//Funció per seleccionar ràpidament una cel·la.
function getCell(x,y){
    return $("img[x="+x+"][y="+y+"]");
}

function coords(x,y,direction){

    movent=true;

    //vertical i horitzontal es el desplaçament que ha de fer la casella desti, per arribar
    //a l'origen.

    vertical=0;
    horitzontal=0;

    xD=0;
    yD=0;

    //(0 top,1right,2bottom,3left)

    //Seqüencia d'if's que detecten a quina direcció s'ha de moure la casella sel·lecionada.
    //Per fer-ho cada opció torna unes noves coordenades amb el destí (xD,yD).

    //0 = adalt.
    if(direction==0){
        xD=x-1;
        yD=y;
    }
    //1 = dreta.
    if(direction==1){
        xD=x;
        yD=y+1;
    }
    //2 = abaix.
    if(direction==2){
        xD=x+1;
        yD=y;
    }
    //3 = esquerra.
    if(direction==3){
        xD=x;
        yD=y-1;
    }

    //Selecionem la casella origen.
    pos=getCell(x,y).position();
    posD=getCell(xD,yD).position();
    
    //I copiem les coordenades a la destí. Amb animació.    

    getCell(xD,yD).animate({ 
        top:(pos.top),
        left:(pos.left)
    }, 100, function(){movent=false;});

    //El mateix però amb l'origen

    getCell(x,y).animate({ 
        top:(posD.top),
        left:(posD.left)
    }, 100, function(){movent=false;});

    //Agafa el destí i li posa les cordenades de l'origen.

    getCell(xD,yD).attr({
      x: x,
      y: y,
      mod: "1"
    });

    //Agafa l'origen i li posa les cordenades del destí.

    //En aquest cas modifico lleugerament el selector per aclarar
    //quina cel·la vull agafar, ja que he modificat les cordenades de 
    //l'anterior, per tant hi ha dos iguals. Agafo la que te un 1 a l'atribut mod.

    $("img[x="+x+"][y="+y+"][mod!=1]").attr({
      x: xD,
      y: yD
    });

    $("img[x="+x+"][y="+y+"][mod=1]").attr({
      mod: "0"
    });

    //Es comprova si s'ha guanyat cada cop.
    checkWin();

}

//Initial, funcio que s'encarrega de posicionar el taulell per primer cop,
//aquesta es crida per cada cel·la a colocar.
function initial(x,y){

    horitzontal = x * $("img").width();
    vertical = y * $("img").width();

    getCell(x,y).css({
        "top":horitzontal,
        "left":vertical
    });
}

//Funció que controla el comptador.
function timer(){
    if (flag){
        clearInterval(counter);
        return;
     }
     count++;
     document.getElementById("timer").innerHTML="<p>"+Math.trunc(count/100)+"</p>"; 
 }

//Funció que reseteja les variables "globals". I el conteindor.
function resetCamp(contenidor){
	contenidor.innerHTML="";

	campsText=0;
	x=0;
	y=0;
	constX=0;
	constY=0;

	imatges = new Array();
}

//Funció que reincia la pàgina.
function playAgain(){
    location.reload(true);
}
