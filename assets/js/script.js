$(document).ready(function() {
    $("form").submit(function (event) {
    event.preventDefault();
    let valueInput = $("#sheroInput").val();
    
    //LLAMADO A LA API
    $.ajax({
        url: "https://www.superheroapi.com/api.php/10162342950256959/" + valueInput,
        success: function(data){
    
    //VARIABLES PARA DATOS DE SUPERHERO
            let imagen = data.image.url;
            let nombre = data.name;
            let afiliacion = data.connections["group-affiliation"];
            let publicado = data.biography.publisher;
            let ocupacion = data.work.occupation;
            let aparicion = data.biography["first-appearance"];
            let altura = data.appearance.height;
            let peso = data.appearance.weight;
            let alias = data.biography.aliases;
            
    //CARD INSERTADA   
            $('#sheroInfo').html(`
            
            <h4 class="text-center">Super Hero Encontrado</h4>
            <div class="bs-example">
            <div class="card" ">
                <div class="row no-gutters">
                    <div class="col12 col-sm-5">
                        <img src="${imagen}"  class="card-img-top">
                    </div>
                    <div class="col-sm-7">
                      <div class="card-body">
                       <h5 class="card-title">Nombre: ${nombre}</h5>
                        <div class="card-text">
                          <p><b>Conexiones:</b> ${afiliacion}</p>
                          <p><b>Publicado por:</b> ${publicado}</p>
                          <hr>
                          <p><b>Ocupación:</b> ${ocupacion}</p>
                          <hr>
                          <p><b>Primera Aparición:</b> ${aparicion}</p>
                          <hr>
                          <p><b>Altura:</b> ${altura}</p>
                          <hr>
                          <p><b>Peso:</b> ${peso}</p>
                          <hr>
                          <p><b>Alianzas:</b> ${alias}</p>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>`);

    //GRAFICO CANVAS

                  var chart = new CanvasJS.Chart("sheroStats", {
                    animationEnabled: true,
                    title: {
                      text: `Estadísticas de Poder para ${nombre}`
                    },
                    data: [{
                      type: "pie",
                      showInLegend: "true",
                      legendText: "{label}",
                      startAngle: 240,
                      yValueFormatString: "##0\"\"",
                      indexLabel: "{label} ({y})",
                      dataPoints: [
                       { y: `${data.powerstats.intelligence}`, label: "intelligence" },
                       { y: `${data.powerstats.strength}`, label: "strength" },
                       { y: `${data.powerstats.speed}`, label: "speed" },
                       { y: `${data.powerstats.durability}`, label: "durability" },
                       { y: `${data.powerstats.power}`, label: "power" },
                      { y: `${data.powerstats.combat}`, label: "combat" }
                      ]
                    }]
                  });
                  chart.render();
        },

    });
    
    });

});