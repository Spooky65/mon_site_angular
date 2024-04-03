import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
// import AES from 'crypto-js/aes'; 
import * as CryptoJS from 'crypto-js';


// import './pixel';

@Component({
  selector: 'app-pixel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pixel.component.html',
  styleUrl: './pixel.component.css',
  providers: [CookieService],
})
export class PixelComponent {
  private intervalId: any;
  constructor(private cookieService: CookieService) {
    // Set cookie
    // this.cookieService.set('cookieName', 'cookieValue');

    // // Get cookie
    // const cookieValue = this.cookieService.get('cookieName');
  }
  
  ngOnInit(): void {
    const cookieService = this.cookieService;
    var width = 100;
    var height = 100;
    // var sizePix = 2;
    var color = 'black'; 
    var countBubble = $('#countBubble').val();
    // Table Pixel
    var pixelBase = document.getElementById('pixelBase');
    // pixelBase.width = width;
    // pixelBase.height = height;
    var pixelCountDiv = document.getElementById('pixelCount');
    var ppsDiv = document.getElementById('pixelPerSec');
    //if(getCookie("pixelCount")){
      //var pixelCount = getCookie("pixelCount");
      // pixel per seconds
      //var pps = getCookie("pps");
    //}else{
    var key = "s4g5e6vy7dj59dkja6gj6h69h65dcf6f";
    if(cookieService.check('pixel')){
      var data = cookieService.get('pixel');
      console.log(data);
      // var AES = require("crypto-js/aes");
      var decrypted = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8); // Messag
      // var decrypted = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8); // Messag
      decrypted = decrypted.split(',');
      color = decrypted[10];

      decrypted = decrypted.map((currentValue) => parseFloat(currentValue));
      pixelCount = decrypted[0];
      pps = decrypted[1];
      genCount = [decrypted[2],decrypted[3],decrypted[4],decrypted[5]];
      genCost = [decrypted[6],decrypted[7],decrypted[8],decrypted[9]];
    }else{
      var pixelCount = 0;
      // pixel per seconds
      var pps = 100;
      // Number of generator
      var genCount = [0,0,0,0];
      // Cost of generator
      var genCost = [15,100,1100,2250];
    }
    // $( document ).ready(function() {
      // var cookieService: CookieService;
      // console.log('Cookie value:', cookieService.get('cookieName'));
      // document.addEventListener('DOMContentLoaded', function() {
      //   var datas = document.querySelector('.js-data');
      //   var data = JSON.parse(datas.dataset.datas);
      //   var link = datas.dataset.link;
      // });
      // Somme des pixel à créer
      var pixelToCreate = 0;
      // Somme des pixel activé
      var pixelActive = 0;
      var dict = new Object();
      var genGain = [0.1,1,8,16];
      var quotienMult = 1.15;
      var refreshTime = 100;
      pixelCountDiv.innerHTML = pixelCount.toString();
      $("#progressbar").css("background-color",color);
    
      function save(): void {
        var BigArray = [pixelCount,pps,genCount,genCost,color];
        var encrypted = CryptoJS.AES.encrypt(BigArray.toString(), key); // Encryption Part
        cookieService.set('pixel', encrypted.toString());
        console.log(encrypted.toString());
      };
    
      $( "#saveButton" ).click(function() {
        save();
        return false; // this stops normal button behaviour from executing;
      });
      setInterval(function () { save(); }, 1000*60*5);
    
      function createTableBase() {
        for (let indexY = 0; indexY < height; indexY++) {
          var tr = document.createElement('tr');
          tr.setAttribute("id", "Y"+indexY);
          for (let indexX = 0; indexX < width; indexX++) {
            var td = document.createElement('td');
            dict[(indexY*width)+indexX] = indexY+"X"+indexX;
            td.setAttribute("id", indexY+"X"+indexX);
            // td.width = sizePix;
            // td.height = sizePix;
            td.style.background = 'white';
            tr.appendChild(td);
          }
          pixelBase.appendChild(tr);
        }
        var countBubble = Number($('#countBubble').val());
        countBubble++;
        $('#countBubble').val(countBubble);
      // console.log(countBubble);
      };
    
      function findNext(coordY,coordX,security) {
        for (let indexY = coordY; indexY < height; indexY++) {
          for (let indexX = coordX; indexX < width; indexX++) {
            var td = document.getElementById(indexY+"X"+indexX);
            if (td.style.background.substr(0, 5) == 'white') {
              refreshPixelCount();
              td.style.background = color;
              pixelActive++;
              verifFullBase();
              return;
            }
          }
          coordX = 0;
        }
        // évite la boucle infini au cas ou il ne trouve aucun pixel blanc
        if(security == false){
          findNext(0,0,true);
        }
      };
    
      function createPixel() {
        var keys = Object.keys(dict);
        var randomKey = keys[ keys.length * Math.random() << 0];
        var random = dict[randomKey];
        delete dict[randomKey];
        var td = document.getElementById(random);
        if (td.style.background.substr(0, 5) == 'white') {
          td.style.background = color;
          refreshPixelCount();
          pixelActive++;
          $("#progressbar").css("width",(pixelActive/10000)*100 + "%");
          verifFullBase();
        }else{
          console.log("Problème dans la fonction random");
        }
      };
    
      function verifFullBase() {
        if (pixelActive == 10000) {
          pixelActive = 0;
          $("#pixelBase tr").remove();
          createTableBase();
        }
      }
    /*
      function createPixel() {
        var coordY = Math.floor(Math.random() * height);
        var coordX = Math.floor(Math.random() * width);
        pixel = document.getElementById(coordY+"X"+coordX);
        if (pixel.style.background.substr(0, 5) == 'white') {
          //pixelCount = pixelCount + 1;
          refreshPixelCount();
          pixel.style.background = color;
          pixelActive++;
          verifFullBase();
        }else{
          findNext(coordY,coordX,false);
        }
      }
    */
    
      function refreshPixelCount() {
        pixelCountDiv.innerHTML = Math.floor(pixelCount).toString();
        ppsDiv.innerHTML = String(Math.floor(pps * 10) / 10);
        // disabled button if no enough pixel
        $( ".addGeneratorButton" ).each(function() {
          var calculC = calculCout(genCost[$( this ).attr("typeGen")] , $( this ).attr("nombre"));
          if(pixelCount < calculC){
            $( this ).prop("disabled",true);
          }else{
            $( this ).prop("disabled",false);
          }
        });
      }
    
      function refreshGenCount() {
        $( ".generatorCount" ).each(function() {
          $( this ).html(String(Math.floor(genCount[$( this ).attr("typeGen")])));
        });
        $( ".generatorCost" ).each(function() {
          $( this ).html(String(Math.floor(calculCout(genCost[$( this ).attr("typeGen")] , $( this ).attr("nombre")))));
        });
      }
    /*
    
      $( "#loadButton" ).click(function() {
        pixelCount = getCookie("pixelCount");
        pps = getCookie("pps");
      });
    */
      this.intervalId = setInterval(function () {
        var ppTick = pps * (refreshTime/1000);
        pixelCount += ppTick;
        refreshPixelCount();
        pixelToCreate += ppTick;
        while(pixelToCreate >= 1){
          pixelToCreate = pixelToCreate - 1;
          createPixel();
        }
      }, refreshTime);
    
      $( ".addGeneratorButton" ).click(function() { clickGenerator( this.getAttribute("typeGen") , this.getAttribute("nombre") ); });
    
      function clickGenerator(type,nombre) {
        var calculC = calculCout(genCost[type],nombre);
        if(pixelCount >= calculC){
          pixelCount -= calculC;
          pps += genGain[type] * nombre;
          genCost[type] = calculC * quotienMult;
          genCount[type] += parseInt(nombre, 10);
        }
        refreshPixelCount();
        refreshGenCount();
      }
    
      function calculCout(base,n) {
        var un = 0;
        for(var i = 0 ; i < n ; i++){
          un += base * Math.pow(quotienMult, i) ;
        }
        return un;
      }
    
      $( "#blackButton" ).click(function() { color = this.getAttribute("color"); $("tr").css("color",color); $("#progressbar").css("background-color",color); });
      $( "#redButton" ).click(function() { color = this.getAttribute("color"); $("tr").css("color",color); $("#progressbar").css("background-color",color); });
      $( "#greenButton" ).click(function() { color = this.getAttribute("color"); $("tr").css("color",color); $("#progressbar").css("background-color",color); });
      $( "#blueButton" ).click(function() { color = this.getAttribute("color"); $("tr").css("color",color); $("#progressbar").css("background-color",color); });
      $( "#orangeButton" ).click(function() { color = this.getAttribute("color"); $("tr").css("color",color); $("#progressbar").css("background-color",color); });
      $( "#resetTableButton" ).click(function() { 
          pixelActive = 0;
          $("#pixelBase tr").remove();
          createTableBase();
      });
      pixelBase.onclick = function() { 
        pixelCount++; 
        createPixel(); 
      };
    
      // if no table are display so there is a problem in js
      createTableBase();
      refreshGenCount();
    // });
  }
  
  ngOnDestroy() {
    // Arrêtez le setInterval lorsque le composant est détruit
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
          // pixelActive = 0;
          $("#pixelBase tr").remove();
  }
}
