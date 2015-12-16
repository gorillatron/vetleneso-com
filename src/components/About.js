
import React, {Component, PropTypes} from "react"
import Radium from "radium"

var About = Radium(class extends Component {

  componentDidMount() {
    this.fadeInAnimation()
    this.imageAnimation()
  }

  fadeInAnimation() {
    new mojs.Tween({
      delay: 300,
      onUpdate: (progress) => {
        setTimeout(() => {
          this.refs['content'].style.opacity = progress
        }, 66)
      }
    }).run()
  }

  imageAnimation() {
    
  }

  render() {
    return (
      <div ref="content"
           style={{
             opacity: 0
           }}>

        <div className="row">
          <div className="twelve columns">
            <img src="/images/selvportrett.jpg"
                 style={{
                   display: 'block',
                   width: 200,
                   margin: '15px auto'
                 }}/>
          </div>
        </div>

        <div className="row">

          <div className="six columns"
               style={{ padding: '0px 15px' }}>

            <h3 style={{textAlign: 'center'}}>Norsk</h3>
            Hallo.
            Hvem jeg er, lurer du kanskje på? Jeg er NESO, fødenavn Vetle Nes-O`Shaughnessy, og jeg er en illustratør.
            <br/><br/>
            Men ikke bare en illustratør.
            <br/><br/>
            Litt mer enn en illustratør.
            <br/><br/>
            Jeg drysser mitt kreative flass både her og der, i tilegg til tegneblokken.
            <br/><br/>
            Særpreget grafisk design, radio, skriving og illustrativ promotering.
            <br/><br/>
            Hvis du har havnet på hjemmesiden min, så betyr det at det er noe nysgjerrighet som kiler deg litt innenfra. Det setter jeg pris på.
            <br/><br/>
            Her er en liten smørbrødliste over mine tidligere erfaringer.
            Håper det vil få nysgjerrigheten din til å gro litt til.
            <br/><br/>
            <ul>
              <li>Tirillprisen for beste illustrasjon (i regi av studentmediene i Bergen) (2015)</li>
              <li>Promotert, digitalisert og bidratt til utstilling på Galleri Kråke i Ålesund av kunstneren Simon Wille (2015)</li>
              <li>Utstilling av egne silketrykk på Camden Image Gallery i London (2015)</li>
              <li>Utgående sommer-reporter for Radio Ålesund (2014)</li>
              <li>T-skjorte og banner illustrasjoner for Radio Ålesunds kundefest “Fisk&Fjas” (2015)</li>
              <li>Med i “Kinosyndromet” i Studentradioen i bergen (2014)</li>
              <li>Startet opp nisje-klesmerket “KLÆR”. (Illustrerte motiv, trykket, reklamerte og sendte ut - stod for alt) - Bacheloroppgaven på Solent University i Southampton (2015)</li>
              <li>Illustratør for Studvest - studentavis i Bergen (2015-)</li>
              <li>Illustrerte singel- og covermotiv, “Vesken” og “Nokke Feita 4”, for rapgruppen “A-Laget” (2015)</li>
              <li>Arrangert veldedighetseventen “Tegnetirsdag” på No Stress Bar i Bergen (2015 og pågående)</li>
              <li>Animert og illustrert kult-klassikeren “JANGWA” (https://www.youtube.com/watch?v=WHeUqPDmNLY) (2013)</li>
              <li>Illustrert plakat, sammen med Jonny Hanna, for “Solent Smilefest” i Southampton (2015)</li>
              <li>En av de daglige lederne for det kreative nettsamfunnet skape.re</li>
            </ul>

          </div>

          <div className="six columns"
               style={{ padding: '0px 15px' }}>

            <h3 style={{textAlign: 'center'}}>English</h3>
            Hello.
            Who am I you might ask? I am NESO, birth-name Vetle Nes-O`Shaughnessy, and I am an illustrator.
            <br/><br/>
            But not only an illustrator.
            <br/><br/>
            More than an illustrator.
            <br/><br/>
            I sprinkle my creative dandruff here and there, as well as on my sketchbook.
            <br/><br/>
            Unique, and distinctive graphic design, radio, writing and illustrative promotion.
            <br/><br/>
            If you`ve ended up here on my homepage, it means that there is some curiosity that`s tickling you from the inside. I really appreciate that.
            <br/><br/>
            Here`s a little list of my accomplishments and experience.
            Hope that will make the curious monkey inside you grow some more.
            <br/><br/>
            <ul>
              <li>Winner of “Tirillprisen” for best illustration (hosted by the student-media in Bergen) 2015</li>
              <li>Promoted, digitalized and contributed to an art-exhibition at Galleri Kråke in Aalesund by artist Simon Wille (2015)</li>
              <li>Displayed personal screen-prints at Camden Image Gallery in London (2015)</li>
              <li>Outgoing summer-reporter for Radio AalesundUtgående sommer-reporter for Radio Aalesund (2015)</li>
              <li>Made banner and t-shirt illustrations for Radio Aaleunds partner-dinner “Fisk&Fjas”(Fishes&Foolery) (2015)</li>
              <li>“Kinosyndromet”/”Cinema-syndrome” - radioshow at the student-radio in Bergen (2014)</li>
              <li>Started up the clothing-line “KLÆR”(“CLOTHES”) - illustrated motives, screen-printed, promoted and shipped - Bachelor assigment at Solent University in Southampton. (2015)</li>
              <li>Illustrator for Studvest - student-newspaper in Bergen (2015-)</li>
              <li>Illustrated single- and album-cover for rap-group “A-Laget” (2015)</li>
              <li>Arranged a charity-event called “Drawing Tuesday” at No Stress Bar in Bergen (2015 and ongoing)</li>
              <li>Animated and Illustrated the cult-classic “JANGWA” (https://www.youtube.com/watch?v=WHeUqPDmNLY) (2013)</li>
              <li>Illustrated poster for Solent Smilefest, with Jonny Hanna, in Southampton (2015)</li>
              <li>One of the CEOs at the creative net-society www.skape.re</li>
            </ul>

          </div>
        </div>

      </div>
    )
  }

})

export default About