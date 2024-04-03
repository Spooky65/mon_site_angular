import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import Timer from 'timer.js';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

}
$( document ).ready(function() {  
  // Timer
  var divShowTimer = document.getElementById("TimerShow");
  var divShowTimerPause = document.getElementById("TimerShowPause");
  var aTimer = new Timer({
    tick    : 1,
    ontick  : function(ms) { console.log(ms + ' milliseconds left');divShowTimer.innerHTML = Math.floor(ms/3600000) + ' heure(s) ' + Math.floor(ms/60000)%60 + ' minute(s) ' + Math.round(ms/1000)%60 + ' second(s) restante(s)'; },
    onstart : function() { console.log('timer started') },
    onstop  : function() { console.log('timer stop') },
    onpause : function() { console.log('timer set on pause') },
    onend   : function() { console.log('timer ended normally') }
  });
  var windowObjectReference;
  var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

  function openRequestedPopup() {
    windowObjectReference = window.open("https://search.brave.com/", "Google_WindowName", strWindowFeatures);
  }
  function closeRequestedPopup() {
    windowObjectReference.close();
    window.focus();
  }

  $( "#TimerButtonStart" ).click(function() {
    var SelectTime = (Number($( "#TimerInputHour" ).val())*3600) + (Number($( "#TimerInputMin" ).val())*60) + Number($( "#TimerInputSec" ).val());
    if(aTimer.getStatus() == "paused"){
      divShowTimerPause.innerHTML = '';
      aTimer.start();
    }else if(SelectTime == 0){
      alert("Timer à 0");
    }else if(aTimer.getStatus() == "started"){

    }else{
      openRequestedPopup();
      divShowTimerPause.innerHTML = '';
      aTimer.start(SelectTime).on('end', function () {
        divShowTimer.innerHTML = '<b class="text-danger text-bold">Terminé ! Retour au travail !</b>';
        closeRequestedPopup();
        // alert('Fini!');
      });
    }
  });
  $( "#TimerButtonPause" ).click(function() {
    if(aTimer.getStatus() == "started"){
      divShowTimerPause.innerHTML = '<b class="text-secondary"> - Pause !</b>';
      aTimer.pause();
    }else if(aTimer.getStatus() == "paused"){
      divShowTimerPause.innerHTML = '';
      aTimer.start();
    }
  });
  $( "#TimerButtonStop" ).click(function() {
    divShowTimer.innerHTML = '';
    divShowTimerPause.innerHTML = '<b class="text-danger">Stop !</b>';
    aTimer.stop();
    closeRequestedPopup();
  });
});