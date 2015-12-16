
import React, {Component, PropTypes} from "react"
import Radium, {Style} from "radium"


var Contact = Radium(class extends Component {

  componentDidMount() {
    this.fadeInAnimation()
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

  render() {
    return (
      <div ref="content"
           style={{
             opacity: 0
           }}>

        <Style scopeSelector=".contact"
               rules={{
                 table: {
                   margin: '0px auto',
                   width: '50%'
                 },
                 td: {
                   borderWidth: '0px'
                 },
                 '[class^="flaticon-"]': {
                   fontSize: '2.1em'
                 }
               }}/>

        <div className="row contact" id="contact">
          <div className="twelve columns">
            <table>

              <tbody>
                <tr>
                  <td>
                    <div className="flaticon-speech-bubble20"></div>
                  </td>
                  <td>
                    <a href="mailto:vn.oshaughnessy@gmail.com">vn.oshaughnessy@gmail.com</a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="flaticon-instagram19"></div>
                  </td>
                  <td>
                    <a target="_blank" href="https://www.instagram.com/vetleneso/">
                      @vetleneso
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="flaticon-behance13"></div>
                  </td>
                  <td>
                    <a target="_blank" href="behance.net/vneso">behance.net/vneso</a>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>

      </div>
    )
  }

})

export default Contact