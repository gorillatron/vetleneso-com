
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
        this.refs['content'].style.opacity = progress
      }
    }).run()
  }

  imageAnimation() {
    console.log('About.imageAnimation() UNIMPLEMENTED')
  }

  render() {
    return (
      <div ref="content"
           className="row"
           style={{
             opacity: 0
           }}>

        <div className="one column">&nbsp;</div>

        <div className="ten columns">
          <img src="/images/selvportrett.jpg"
               style={{
                 width: 200,
                 float: 'left',
                 margin: '0px 20px 20px 0px'
               }}/>

              <p>Lorem ipsum dolor sit amet, eu epicurei appareat eam. Vel te alienum iracundia. Vix ex tractatos iudicabit, in solet numquam fuisset ius, tantas decore exerci sit ut. Ne saepe deleniti invenire mei, eu mei sint aeque euismod.</p>

              <p>Ei odio prima usu. Pri id tacimates inciderint ullamcorper, commune quaestio voluptatibus ei quo. Mei saepe expetendis scribentur in, pro quas cotidieque ut. Usu nonumes consulatu instructior in.</p>

              <p>An nibh recteque gloriatur mel, vim nostro scaevola ea. Enim clita accommodare vis at. An eos feugait fastidii petentium, qualisque consectetuer ad vim. Assueverit dissentiunt et eos.</p>

              <p>Dictas euripidis at eam, possit inermis no mea. Cum id etiam malorum. In has aliquid accusam, per putent intellegam id, primis nostrud democritum in sed. Id tritani comprehensam eos, id wisi mundi viris his, fugit dictas animal ex qui. Essent tractatos repudiandae est et, eu eos vitae voluptatum.</p>

              <p>Ea iisque insolens mea, eos ea sumo modus suscipit. Ne mel iisque hendrerit, amet deserunt has te, vix mazim everti delicatissimi in. Pri laudem labore id, summo adipisci quaestio et eum, cu vix possim doctus definitiones. Tamquam definitiones ex pri, in pro legimus posidonium omittantur.</p>

                <p>Lorem ipsum dolor sit amet, eu epicurei appareat eam. Vel te alienum iracundia. Vix ex tractatos iudicabit, in solet numquam fuisset ius, tantas decore exerci sit ut. Ne saepe deleniti invenire mei, eu mei sint aeque euismod.</p>

                <p>Ei odio prima usu. Pri id tacimates inciderint ullamcorper, commune quaestio voluptatibus ei quo. Mei saepe expetendis scribentur in, pro quas cotidieque ut. Usu nonumes consulatu instructior in.</p>

                <p>An nibh recteque gloriatur mel, vim nostro scaevola ea. Enim clita accommodare vis at. An eos feugait fastidii petentium, qualisque consectetuer ad vim. Assueverit dissentiunt et eos.</p>

                <p>Dictas euripidis at eam, possit inermis no mea. Cum id etiam malorum. In has aliquid accusam, per putent intellegam id, primis nostrud democritum in sed. Id tritani comprehensam eos, id wisi mundi viris his, fugit dictas animal ex qui. Essent tractatos repudiandae est et, eu eos vitae voluptatum.</p>

                <p>Ea iisque insolens mea, eos ea sumo modus suscipit. Ne mel iisque hendrerit, amet deserunt has te, vix mazim everti delicatissimi in. Pri laudem labore id, summo adipisci quaestio et eum, cu vix possim doctus definitiones. Tamquam definitiones ex pri, in pro legimus posidonium omittantur.</p>

                  <p>Lorem ipsum dolor sit amet, eu epicurei appareat eam. Vel te alienum iracundia. Vix ex tractatos iudicabit, in solet numquam fuisset ius, tantas decore exerci sit ut. Ne saepe deleniti invenire mei, eu mei sint aeque euismod.</p>

                  <p>Ei odio prima usu. Pri id tacimates inciderint ullamcorper, commune quaestio voluptatibus ei quo. Mei saepe expetendis scribentur in, pro quas cotidieque ut. Usu nonumes consulatu instructior in.</p>

                  <p>An nibh recteque gloriatur mel, vim nostro scaevola ea. Enim clita accommodare vis at. An eos feugait fastidii petentium, qualisque consectetuer ad vim. Assueverit dissentiunt et eos.</p>

                  <p>Dictas euripidis at eam, possit inermis no mea. Cum id etiam malorum. In has aliquid accusam, per putent intellegam id, primis nostrud democritum in sed. Id tritani comprehensam eos, id wisi mundi viris his, fugit dictas animal ex qui. Essent tractatos repudiandae est et, eu eos vitae voluptatum.</p>

                  <p>Ea iisque insolens mea, eos ea sumo modus suscipit. Ne mel iisque hendrerit, amet deserunt has te, vix mazim everti delicatissimi in. Pri laudem labore id, summo adipisci quaestio et eum, cu vix possim doctus definitiones. Tamquam definitiones ex pri, in pro legimus posidonium omittantur.</p>
        </div>

        <div className="one column">&nbsp;</div>

      </div>
    )
  }

})

export default About