
import React, {Component, PropTypes} from "react"
import Radium from "radium"

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

        <div className="row">
          <div className="twelve columns">
            <table style={{ margin: '0px auto', width: '70%' }}>

              <tr>
                <td>Email:</td>
                <td></td>
              </tr>

              <tr>
                <td>Telefon:</td>
                <td></td>
              </tr>

              <tr>
                <td>What:</td>
                <td></td>
              </tr>

            </table>
          </div>
        </div>

      </div>
    )
  }

})

export default Contact