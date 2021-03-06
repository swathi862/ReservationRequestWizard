import React, {Component} from 'react';
import { Form, Container, Col, Button, Row, Breadcrumb, OverlayTrigger, Tooltip } from 'react-bootstrap'
import keyMirror from 'keymirror';
import './SingleFormWizard.css'

class Page extends Component {
  constructor(props) {
    super(props);
    this.parent = props.parent
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        {this.props.children}
        <br/>
        <div className="nav-buttons">
            {this.props.onBack && 
                <Button variant="secondary" type="button" onClick={this.props.onBack}>Back</Button>
            }
            {this.props.onNext && 
                <Button className="next-btn" variant="primary" onClick={this.props.onNext}>Next</Button>
            }
        </div>
      </div>
    );
  }
};

class BaseTripForm extends Component {
    render(){
    return(
          <Container>
            <Form.Group>
            {(this.props.type === "Day Field Trip" || this.props.type === "Overnight Field Trip") &&
                <Container>
                    <Form.Row>
                        <Form.Label column lg={7} className="required">
                            Approximately, how many students will be attending?
                        </Form.Label>
                        <Col xs={2}>
                            <Form.Control
                            required 
                            name="students"
                            value={this.props.students ? this.props.students : ""}
                            onChange={this.props.validate}/>
                            <Form.Control.Feedback type="invalid">
                                Please input an approximate value.
                            </Form.Control.Feedback>
                            <br/>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column lg={7} className="required">
                            Approximately, how many faculty/chaperone members will be attending?
                        </Form.Label>
                        <Col xs={2}>
                            <Form.Control
                            required 
                            name="faculty"
                            value={this.props.faculty ? this.props.faculty : ""}
                            onChange={this.props.validate}/>
                            <Form.Control.Feedback type="invalid">
                                Please input an approximate value.
                            </Form.Control.Feedback>
                            <br/>
                        </Col>
                    </Form.Row>
                </Container>
            }
            {(this.props.type === "Conference" || this.props.type === "Tour" || this.props.type === "Other") &&
                <Container>
                    <Form.Row>
                        <Form.Label column lg={5} className="required">
                            Approximately, how many people will be attending?
                        </Form.Label>
                        <Col xs={2}>
                            <Form.Control 
                                name="people"
                                value={this.props.people ? this.props.people : ""}
                                onChange={this.props.validate}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please input an approximate value.
                            </Form.Control.Feedback>
                            {this.props.type === "Tour" &&
                                <Form.Control.Feedback>
                                    Tours typically include a minimum of 25 people. If your group involves a fewer number, please provide additional details on the next page.
                                </Form.Control.Feedback>
                            }
                                <br/>
                        </Col>
                    </Form.Row>
                </Container>
            }
            <br/>
            <Container>
                <div onChange={this.props.handleChange}>
                    <Form.Label className="required">Do you need us to provide meals? </Form.Label>
                    <Form.Row>
                    <Form.Check className="radio-input" type="radio" name="food" value="Yes" label="Yes" checked={this.props.food === "Yes"} onChange={() => {}} required />
                    <Col>
                    <Form.Check className="radio-input" type="radio" name="food" value="No" label="No" checked={this.props.food === "No"} onChange={() => {}} required />
                    </Col></Form.Row><br/>
                </div>
                {(this.props.type === "Overnight Field Trip" || this.props.type === "Conference" || this.props.type === "Other")&&
                <div onChange={this.props.handleChange}>
                    <Form.Label className="required">Do you need to stay onsite? </Form.Label>
                    <Form.Row>
                    <Form.Check className="radio-input" type="radio" name="overnight" value="Yes" label="Yes" checked={this.props.overnight === "Yes"} onChange={() => {}} required />
                    <Col>
                    <Form.Check className="radio-input"type="radio" name="overnight" value="No" label="No" checked={this.props.overnight === "No"} onChange={() => {}} required />
                    </Col></Form.Row>
                </div>
                }
            </Container>
            </Form.Group>
          </Container>
    );
    }
  }

class Rooms extends Component {
    render(){
        return(
            <>
            <h5>Room Accommodations</h5>
                <Form.Row>
                <Col xs={3}>
                    <div onChange={this.props.handleChange}>
                        <Form.Label column lg={10} className="required">Where do you want to stay onsite? </Form.Label>
                        <Form.Check type="radio" name="room_location" value="Campground" label="Campground" checked={this.props.room_location === "Campground"} onChange={()=>{}} required />
                        <Form.Check type="radio" name="room_location" value="Indoor Facility" label="Indoor Facility" checked={this.props.room_location === "Indoor Facility"} onChange={()=>{}} required />
                        {this.props.room_location !== null &&
                            <Form.Control.Feedback type="invalid">
                                Please select an option.
                            </Form.Control.Feedback>
                        }
                    </div>
                </Col><br/>
                <Col>
                <Form.Label column lg={9}>Please specify the dates/times when you will require housing this space.</Form.Label>
                <Container>
                    <Form.Row>
                        <Form.Label column lg={4} className="required">Start Date/Time: </Form.Label>
                        <Col xs={6}>
                            <Form.Control
                                type="datetime-local"
                                name="room_start"
                                value={this.props.room_start} 
                                onChange={this.props.handleChange}
                                required 
                                />
                            <Form.Control.Feedback type="invalid">
                                Please provide a start date/time for when you will require accommodations.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Row><br/>
                    <Form.Row>
                        <Form.Label column lg={4} className="required">End Date/Time: </Form.Label>
                        <Col xs={6}>
                            <Form.Control
                                type="datetime-local" 
                                name="room_end"
                                value={this.props.room_end}
                                onChange={this.props.handleChange}
                                required 
                                />
                            <Form.Control.Feedback type="invalid">
                                Please provide a end date/time for when you anticipate leaving the accommodation.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Row>
                </Container>
                </Col>
                <Col xs={3}>
                    <div>
                    <OverlayTrigger
                        placement="top"
                        transition={false}
                        overlay={
                            <Tooltip id="lodging-tooltip">
                                (i.e. how many people will require onsite lodging?, how many rooms will be needed?, specific lodging arrangements?)
                            </Tooltip>
                        }
                        >
                        <Form.Label column lg={10} className="required">Please provide further details about lodging.</Form.Label>
                    </OverlayTrigger>
                        <Form.Control as="textarea" rows={3} name="room_detail" value={this.props.room_detail ? this.props.room_detail : ""} onChange={this.props.validate} required />
                            <Form.Control.Feedback type="invalid">
                                Please provide some information.
                            </Form.Control.Feedback>
                    </div>
                </Col><br/>
                </Form.Row><br/>
            </>
        )
    }
}

class GeneralForm extends Component {
    render(){
        return(
            <>
            <h5>Other Details</h5>
            <h6>Educational Activities</h6>
            <h7>Is there any other information that the education team should know about your group?</h7>
            <Form.Control as="textarea" rows={3}
                name="education_details"
                value={this.props.education_details ? this.props.education_details : ""}
                onChange={this.props.handleChange}/><br/>
            <Container>
                <Form.Row>
                    <Form.Label>
                        Are there any activities offered by the GBO Science Center that you're interested in?<br/> 
                        <a href="https://greenbankobservatory.org/wp-content/uploads/2021/02/GB_SciCen_Brochure_final-sm.pdf">
                            Guide to activities offered by GB team
                        </a>
                    </Form.Label>
                    <Col xs={4}>
                        <Form.Control 
                            name="activities"
                            value={this.props.activities ? this.props.activities : ""}
                            onChange={this.props.handleChange}
                            />
                    </Col>
                </Form.Row><br/>
                <Form.Row>
                    <Form.Label>Please use this section to specify your exact schedule that will involve activities on the GBO campus.</Form.Label>
                        <Form.Control as="textarea" rows={3}
                        name="schedule_details"
                        value={this.props.schedule_details ? this.props.schedule_details : ""}
                        onChange={this.props.handleChange}
                        />
                </Form.Row><br/>
                <Form.Row>
                    <Form.Label>Is there any other information you'd like to add? </Form.Label>
                        <Form.Control as="textarea" rows={3}
                        name="details"
                        value={this.props.details ? this.props.details : ""}
                        onChange={this.props.handleChange}
                        />
                </Form.Row>
            </Container>
            </>
        )
    }
} 

const pages = keyMirror({
  welcome_page: true,
  basic_info_page: true,
  attendance_page: true,
  visit_details_page: true,
  review_page: true,
});

class ConsolidatedWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: pages.welcome_page,
      basic_info_validated: false,
      attendance_validated: false,
      visit_details_validated: false,
      form: {
        arrival: null,
        departure: null,
        purpose: null,
        students: null,
        faculty: null,
        food: null,
        food_details: null,
        education_details: null,
        schedule_details: null,
        activities: null,
        details: null,
        overnight: null,
        people: null,
        room_location: null,
        room_detail: null,
        room_start: null,
        room_end: null,
        call_link: null,
        call_link_q: null,
        call_platform: null,
        group_type: null,
        age_range: null,
        program_type: [],
        bread: [],
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMultipleInputChange = this.handleMultipleInputChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({form: {...this.state.form, [name]: value}});
  }

  handleMultipleInputChange(event) {
    const target = event.target;
    const value = Array.from(event.target.selectedOptions, (item) => item.value);
    const name = target.name;
    this.setState({form: {...this.state.form, [name]: value}});
  }

  handleValidation(event) {
    const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } 
    if(this.state.current_page === "basic_info_page"){
        this.setState({ basic_info_validated: true})
    } 
    else if(this.state.current_page === "attendance_page"){
        this.setState({ attendance_validated: true})
    } 
    else if(this.state.current_page === "visit_details_page"){
        this.setState({ visit_details_validated: true})
    }   
    
    this.handleInputChange(event)
  };

  handleNext(name, value) {
    this.setState({form: {...this.state.form, [name]: value}});
  }

  render() {
    const welcome_page = (
        <Page
          title="Welcome"
          parent={null}
          onNext={(event) => {
            this.state.form.bread.push(this.state.current_page)
            this.setState({...this.state, current_page: "basic_info_page"});
            event.preventDefault();
          }} 
        >
          <Container>
              <h5>Welcome to GBORS! Hello, (User- <em>Organization</em>)</h5>
              {/* <img className="welcome-gif" src="https://media.giphy.com/media/bcKmIWkUMCjVm/giphy.gif" alt="welcome"/> */}
          </Container>
        </Page>
    )

    const basic_info_page = (
      <Page
        title="Basic Info"
        parent={welcome_page}
        onNext={(event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } 
            this.setState({...this.state, basic_info_validated: true}); 

            this.state.form.bread.push(this.state.current_page)
            let nextPage =""
            if ((this.state.form.purpose && this.state.form.departure && this.state.form.arrival) !== null) {
                nextPage = "attendance_page"
            } else {
                console.log(this.state.form.purpose)
              }
            if (nextPage) {
                console.log(`Navigating to ${nextPage}!`)
                this.setState({...this.state, current_page: nextPage});
            } else {
                console.log(`NOT Navigating to ${nextPage}!`)
            }
            event.preventDefault();
        }}
        onBack={(event)=>{
            this.state.form.bread.pop()
            this.setState({...this.state, current_page: "welcome_page"})
            event.preventDefault();
        }}
      >
        <Container>
            <h5>Arrival/Departure </h5>
            <Form.Label>What time and date would you like to plan your arrival/departure at the Green Bank Observatory?</Form.Label><br/>
            <Container>
                <Form.Row>
                    <Form.Label column lg={3} className="required">Arrival Date/Time: </Form.Label>
                    <Col xs={4}>
                        <Form.Control
                            type="datetime-local"
                            name="arrival"
                            value={this.state.form.arrival ? this.state.form.arrival : ""} 
                            onChange={this.handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid arrival date/time.
                      </Form.Control.Feedback>
                    </Col>
                </Form.Row><br/>
                <Form.Row>
                    <Form.Label column lg={3} className="required">Departure Date/Time: </Form.Label>
                    <Col xs={4}>
                        <Form.Control
                            type="datetime-local"
                            name="departure"
                            min={this.state.form.arrival}
                            value={this.state.form.departure ? this.state.form.departure : ""} 
                            onChange={this.handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid departure date/time.
                        </Form.Control.Feedback>
                        </Col>
                </Form.Row>
            </Container><br/>
            <h5>Purpose of Visit </h5>
            
            <Form.Label className="required">Select the purpose of your visit: </Form.Label>
            <Form.Control.Feedback type="invalid">Please select an option!</Form.Control.Feedback>
            <Container onChange={this.handleInputChange}>
                <Form.Row>
                    <Col>
                        <OverlayTrigger
                            placement="top"
                            transition={false}
                            overlay={
                                <Tooltip id="daytrip-tooltip">
                                    A Day Field Trip is for educational groups/organizations that visit the GBO
                                </Tooltip>
                            }
                        >
                            <Form.Check type="radio" name="purpose" value="Day Field Trip" label="Educational- Day Field Trip" checked={this.state.form.purpose === "Day Field Trip"} onChange={()=>{}} required />
                        </OverlayTrigger>
                        
                    </Col>
                    <Col>
                        <OverlayTrigger
                            placement="top"
                            transition={false}
                            overlay={
                                <Tooltip id="nighttrip-tooltip">
                                    An Overnight Field Trip is for educational groups/organizations that intend to stay/visit the GBO campus for multiple days consecutively.
                                </Tooltip>
                            }
                        >
                            <Form.Check type="radio" name="purpose" value="Overnight Field Trip" label="Educational- Overnight Field Trip" checked={this.state.form.purpose === "Overnight Field Trip"} onChange={()=>{}} required />
                        </OverlayTrigger>
                    </Col>
                    <Col>
                        <OverlayTrigger
                            placement="top"
                            transition={false}
                            overlay={
                                <Tooltip id="virtual-tooltip">
                                    If you'd like to schedule a virtual tour of the GBO or a talk with a GBO educator, select this option.
                                </Tooltip>
                            }
                        >
                            <Form.Check type="radio" name="purpose" value="Virtual Visit" label="Virtual Visit" checked={this.state.form.purpose === "Virtual Visit"} onChange={()=>{}} required />
                        </OverlayTrigger>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <OverlayTrigger
                            placement="top"
                            transition={false}
                            overlay={
                                <Tooltip id="conference-tooltip">
                                    If you have received an invitation to attend a conference hosted at the GBO, select this option.
                                </Tooltip>
                            }
                        >
                            <Form.Check type="radio" name="purpose" value="Conference" label="Conference" checked={this.state.form.purpose === "Conference"} onChange={()=>{}} required />
                        </OverlayTrigger>
                    </Col>
                    <Col>
                        <OverlayTrigger
                            placement="top"
                            transition={false}
                            overlay={
                                <Tooltip id="tour-tooltip">
                                    A Tour involves a guided tour around the Green Bank Observatory's campus.
                                </Tooltip>
                            }
                        >
                            <Form.Check type="radio" name="purpose" value="Tour" label="Tour" checked={this.state.form.purpose === "Tour"} onChange={()=>{}} required />
                        </OverlayTrigger>
                    </Col>
                    <Col><Form.Check type="radio" name="purpose" value="Other" label="Other" checked={this.state.form.purpose === "Other"} onChange={()=>{}} required /></Col>
                </Form.Row>
            </Container>
        </Container>
      </Page>
    )

    const attendance_page = (
        <Page
          title = {`${this.state.form.purpose} Details`}
          parent={basic_info_page}
          onNext={(event) => {
            this.state.form.bread.push(this.state.current_page)
            if(this.state.form.purpose === "Virtual Visit"){
                if (this.state.form.people !== null && this.state.form.group_type !== null && this.state.form.age_range !== null && this.state.form.program_type !== null){
                    this.setState({...this.state, current_page: "visit_details_page"});
                    this.setState(
                        {form: 
                            {...this.state.form, 
                                food: "No",
                                overnight: "No"
                            }
                        }
                    );
                }
            } else if (this.state.form.purpose === "Day Field Trip" || this.state.form.purpose === "Tour"){
                if (((this.state.form.people || this.state.form.students || this.state.form.faculty) !== null) && this.state.form.food !== null){
                    this.setState({...this.state, current_page: "visit_details_page"});
                    this.setState(
                        {form: 
                            {...this.state.form, 
                                overnight: "No"
                            }
                        }
                    );
                }
                else {
                    this.handleValidation(event)
                }
            }
            else {
                if (((this.state.form.people || this.state.form.students || this.state.form.faculty) !== null) && this.state.form.food !== null && this.state.form.overnight !== null){
                    this.setState({...this.state, current_page: "visit_details_page"});
                }
                else {
                    this.handleValidation(event)
                }
            }

            event.preventDefault();
          }}
          onBack={(event) => {
            this.state.form.bread.pop()
            this.setState({...this.state, current_page: "basic_info_page"});
            event.preventDefault();
          }}
        >
            {this.state.form.purpose === "Day Field Trip" &&
                <BaseTripForm
                    type="Day Field Trip"
                    students={this.state.form.students}
                    faculty={this.state.form.faculty}
                    food = {this.state.form.food}
                    handleChange={this.handleInputChange}
                    validate={this.handleValidation}
                />
            }
            {this.state.form.purpose === "Overnight Field Trip" &&
                <BaseTripForm
                    type="Overnight Field Trip"
                    students={this.state.form.students}
                    faculty={this.state.form.faculty}
                    overnight={this.state.form.overnight}
                    food={this.state.form.food}
                    handleChange={this.handleInputChange}
                    validate={this.handleValidation}
                />
            }
            {this.state.form.purpose === "Virtual Visit" &&
                <Container>

                    <Form.Row>
                        <Form.Label column lg={4} className="required">
                            What kind of group are you representing?
                        </Form.Label>

                        <Col xs={6}>
                            <Form.Control as="select" name="group_type" value={this.state.form.group_type ? this.state.form.group_type : ""} onChange={this.handleInputChange} required>
                                <option />
                                <option value="Sanctioned school group (K-12)">Sanctioned school group (K-12)</option>
                                <option value="Sanctioned uni/college group">Sanctioned uni/college group</option>
                                <option value="Church youth group">Church youth group</option>
                                <option value="Homeschool association/club">Homeschool association or club</option>
                                <option value="Scout/4-H/Civil Air Patrol/other after-school group/club">Scout, 4-H, Civil Air Patrol, or other after-school group or club</option>
                                <option value="Camp from museum/organization">Camp from another museum or organization</option>
                                <option value="Adult enrichment/professional development">Adult enrichment or professional development</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Col>

                    </Form.Row><br/>

                    <Form.Row>
                        <Form.Label className="required">
                            What is the approximate age range of the students?
                        </Form.Label>
                        <Col xs={2}>
                            <Form.Control
                                name="age_range"
                                type="text"
                                value={this.state.form.age_range ? this.state.form.age_range : ""}
                                onChange={this.handleInputChange}
                                required
                            />
                        </Col>
                    </Form.Row><br/>

                    <Form.Row>
                        <Form.Label className="required">
                            Approximately, how many people do you anticipate will attend?
                        </Form.Label>
                        <Col xs={1}>
                            <Form.Control 
                                name="people" 
                                value={this.state.form.people ? this.state.form.people : ""} 
                                onChange={this.handleInputChange}
                                required
                                />
                        </Col>
                    </Form.Row><br/>

                    <Form.Label className="required">What program(s) are you interested in? </Form.Label>
                    <Form.Control.Feedback type="invalid">Please select an option!</Form.Control.Feedback>
                    <Col xs={4}>
                    <Form.Control as="select" multiple={true} name="program_type" value={this.state.form.program_type ? this.state.form.program_type : ""} onChange={this.handleMultipleInputChange} required> 
                            <OverlayTrigger
                                placement="right"
                                transition={false}
                                overlay={
                                    <Tooltip id="history-tooltip">
                                        30-45 minutes; Learn about the history of radio astronomy and the Green Bank Observatory. Usually offered in conjunction with the Science Discussion.
                                    </Tooltip>
                                }
                            >
                                <option value="Site History">Site History</option>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="right"
                                transition={false}
                                overlay={
                                    <Tooltip id="discussion-tooltip">
                                        30-45 minutes; Learn about the Green Bank Telescope's science projects, and analyze real data from our Twenty Meter Telescope. Usually offered in conjunction with the Site History presentation.
                                    </Tooltip>
                                }
                            >
                                <option value="Science Discussion">Science Discussion</option>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="right"
                                transition={false}
                                overlay={
                                    <Tooltip id="site_tour-tooltip">
                                        60-90 minutes; Learn about the history of radio astronomy and Green Bank telescopes and projects. Suitable for third grade and older.
                                    </Tooltip>
                                }
                            >
                                <option value="Site Tour">Site Tour</option>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="right"
                                transition={false}
                                overlay={
                                    <Tooltip id="gbt_tour-tooltip">
                                        60-90 minutes; Learn about the design of the Green Bank Telescope, how it moves, how it collects data, and what makes one of the world's premier radio telescopes. Suitable for advanced high school and older.
                                    </Tooltip>
                                }
                            >
                                <option value="GBT Tour">GBT Tour</option>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="right"
                                transition={false}
                                overlay={
                                    <Tooltip id="discovery-tooltip">
                                        90-120 minutes; Learn about Green Bank telescopes and projects, and then use real data from our Twenty Meter Telescope to discover the motion and structure of the Milky Way. Suitable for fifth grade and older.
                                    </Tooltip>
                                }
                            >
                                <option value="Milky Way Discovery">Milky Way Discovery</option>  
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="right"
                                transition={false}
                                    overlay={
                                    <Tooltip id="vRAD-tooltip">
                                        At least two 60-90 minute sessions over two days. Use the Twenty Meter Telescope to take data and discover the motion and structure of the Milky Way. Suitable for fifth grade and older.
                                    </Tooltip>
                                }
                            >
                                <option value="Virtual Radio Astronomer for a Day">Virtual Radio Astronomer for a Day</option>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="right"
                                transition={false}
                                overlay={
                                    <Tooltip id="visits-tooltip">
                                        For special interest groups, such as ham radio, or if you would like to schedule a visit around a specific part of your students??? curriculum!
                                    </Tooltip>
                                }
                            >
                                <option value="Personalized Visits">Personalized Visits</option>
                            </OverlayTrigger>

                            <option value="Other">Other</option>
                    </Form.Control>
                    </Col>
                    <br/>

                    <Form.Row>
                    <Col>
                    <Form.Row>
                        <Form.Label className="required">
                            Video Call Platform
                        </Form.Label>
                        <Col xs={4}>
                            <Form.Control as="select" name="call_platform" value={this.state.form.call_platform ? this.state.form.call_platform : ""} onChange={this.handleValidation} required>
                                <option />
                                <option value="Zoom">Zoom</option>
                                <option value="Teams">Teams</option>
                                <option value="WebEx">WebEx</option>
                                <option value="Meet">Meet</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    </Col>
                    <Col>
                    <Form.Row>
                        <Form.Label column lg={7}>Select the box if you have a video call link you'd prefer to use (if not, the GBO team can provide you with one) </Form.Label>
                        <input
                            className="checkbox-input"
                            name="call_link_q"
                            type="checkbox"
                            checked={this.state.form.call_link_q}
                            onChange={this.handleInputChange}
                        />
                    </Form.Row>
                    </Col>
                    </Form.Row>

                    <Form.Row>
                        <Form.Label>
                            Video Call Link
                        </Form.Label>
                        <Col xs={5}>
                            <Form.Control
                                name="call_link"
                                type="text"
                                value={this.state.form.call_link ? this.state.form.call_link : ""}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Form.Row>
                </Container>
            }
            {this.state.form.purpose === "Conference" &&
                <BaseTripForm
                    type="Conference"
                    people={this.state.form.people}
                    food={this.state.form.food}
                    overnight={this.state.form.overnight}
                    handleChange={this.handleInputChange}
                    validate={this.handleValidation}
                />
            }
            {this.state.form.purpose === "Tour" &&
                <BaseTripForm
                    type="Tour"
                    people={this.state.form.people}
                    food={this.state.form.food}
                    handleChange={this.handleInputChange}
                    validate={this.handleValidation}
                />
            }
            {this.state.form.purpose === "Other" &&
                <BaseTripForm
                    type="Other"
                    people={this.state.form.people}
                    food={this.state.form.food}
                    overnight={this.state.form.overnight}
                    handleChange={this.handleInputChange}
                    validate={this.handleValidation}
                />
            }

        </Page>
    )

    const visit_details_page = (
        <Page
          title = {`${this.state.form.purpose}- Visit Details`}
          parent = {basic_info_page}
          onNext={(event) => {
            this.state.form.bread.push(this.state.current_page)
            if (this.state.form.food === "Yes" && this.state.form.overnight === "Yes"){
                if(this.state.form.food_details && this.state.form.room_location && this.state.form.room_start && this.state.form.room_end){
                    this.setState({...this.state, current_page: "review_page"});
                }
            } else if (this.state.form.food === "Yes"){
                if(this.state.form.food_details){
                    this.setState({...this.state, current_page: "review_page"});
                }
            } else if (this.state.form.overnight === "Yes"){
                if(this.state.form.room_location && this.state.form.room_start && this.state.form.room_end){
                    this.setState({...this.state, current_page: "review_page"});
                }
                else if(this.state.form.room_location && !this.state.form.room_start && !this.state.form.room_end){
                    this.handleNext("room_start", this.state.form.arrival)
                    this.handleNext("room_end", this.state.form.departure)
                    this.handleValidation(event)
                    if(this.state.form.room_start && this.state.form.room_end){
                        this.setState({...this.state, current_page: "review_page"});
                    }
                } 
            } else if (this.state.form.food === "No" && this.state.form.overnight === "No"){
                this.setState({...this.state, current_page: "review_page"});
            }
            event.preventDefault();
          }}
          onBack={(event) => {
            this.state.form.bread.pop()
            this.setState({...this.state, current_page: "attendance_page"});
            event.preventDefault();
          }}
        >
            {this.state.form.food === "Yes" &&
            <>
                <h5>Meal Information</h5>
                <Form.Row>
                    <Col xs={8}>
                    <Form.Label className="required">
                        What meals are needed? Approximately, how many people will require meals? <br/>Please provide all relevant details (i.e. food preferences, allergies)  
                    </Form.Label>
                        <Form.Control as="textarea" rows={3}
                        name="food_details"
                        value={this.state.form.food_details ? this.state.form.food_details : ""}
                        onChange={this.handleInputChange}
                        />
                    </Col>
                </Form.Row><br/>
            </>
            }
            {this.state.form.overnight === "Yes" &&
                <Rooms
                    type={this.state.form.purpose}
                    room_location={this.state.form.room_location}
                    room_detail={this.state.form.room_detail}
                    room_start={!this.state.form.room_start ? this.setState({form: {...this.state.form, room_start: this.state.form.arrival}}) : this.state.form.room_start}
                    room_end={!this.state.form.room_end ? this.setState({form: {...this.state.form, room_end: this.state.form.departure}}) : this.state.form.room_end}
                    handleChange={this.handleInputChange}
                    validate={this.handleValidation}
                    />
            }
            <GeneralForm
                education_details={this.state.form.education_details}
                activities = {this.state.form.activities}
                schedule_details={this.state.form.schedule_details}
                details = {this.state.form.details}
                handleChange = {this.handleInputChange}
            />

        </Page>
    )

    const review_page =  (
        <Page
          title = "Review Page"
          parent = {visit_details_page}
          onBack={(event) => {
            this.state.form.bread.pop()
            this.setState({...this.state, current_page: "visit_details_page"});
            event.preventDefault();
          }}
        >
            <Row>
                <Col><strong>Arrival Date/Time:</strong> {new Date(this.state.form.arrival).toString()}</Col>
            </Row>
            <Row>
                <Col><strong>Departure Date/Time:</strong> {new Date(this.state.form.departure).toString()}</Col>
            </Row>
            <Row>
                <Col><strong>Purpose of Visit:</strong> {this.state.form.purpose}</Col>
            </Row>
            {this.state.form.purpose === "Virtual Visit" ?
            <>
                <Row>
                    <Col><strong>Group Type:</strong> {this.state.form.group_type}</Col>
                </Row>
                <Row>
                    <Col><strong>Attendance:</strong> {this.state.form.people}</Col>
                </Row>
                <Row>
                    <Col><strong>Age Range:</strong> {this.state.form.age_range}</Col>
                </Row>
                <Row>
                    <Col><strong>Program(s) Requested:</strong> {this.state.form.program_type ? this.state.form.program_type.map((program)=> program + ",") : "No programs selected"}</Col>
                </Row>
                <Row>
                    <Col><strong>Video Call Platform:</strong> {this.state.form.call_platform}</Col>
                </Row>
                <Row>
                    <Col><strong>Video Call Link:</strong> {this.state.form.call_link_q ? this.state.form.call_link : <em>"Green Bank Observatory will be providing you with a link"</em>}</Col>
                </Row>
            </>
            :
            <>
                <Row>
                    <Col><strong>Attendance:</strong> {this.state.form.people ? <div>{this.state.form.people} people</div> : <div> Students: {this.state.form.students} <br/> Faculty/Chaperones: {this.state.form.faculty} </div>}</Col>
                </Row>
                <Row>
                    <Col><strong>Food:</strong> {this.state.form.food === "Yes" ? <div>Meal Details: {this.state.form.food_details}</div> : "N/A"}</Col>
                </Row>
                <Row>
                    <Col><strong>Room Accommodations:</strong> {this.state.form.overnight === "Yes" ? <div>Onsite: {this.state.form.room_location}<br/><Col> Start: {new Date(this.state.form.room_start).toString()} <br/> End: {new Date(this.state.form.room_end).toString()} </Col>Details: {this.state.form.room_detail}</div> : "N/A"}</Col>
                </Row>
            </>
            }
            <Row>
                <Col><strong>Educational Activities:</strong> {this.state.form.education_details}</Col>
            </Row>
            <Row>
                <Col><strong>Science Center Activities:</strong> {this.state.form.activities}</Col>
            </Row>
            <Row>
                <Col><strong>Activities:</strong> {this.state.form.schedule_details}</Col>
            </Row>
            <Row>
                <Col><strong>Other Information:</strong> {this.state.form.details}</Col>
            </Row>
            
            <br/>
            {/* <code>{JSON.stringify(this.state,null, 2)}</code><br/> */}
            <div className="submit-btn">
                <Button variant="success" 
                    onClick={()=> window.alert("Your reservation request has been submitted successfully! The GBO Education team will be in touch with you within 5-7 business days.")}>
                    Submit!
                </Button>
            </div>
        </Page>
    )

    let page;
    let validation_page;
    if (this.state.current_page === "basic_info_page") {
        page = basic_info_page;
        validation_page = this.state.basic_info_validated
    } else if (this.state.current_page === "welcome_page") {
        page = welcome_page;
    } else if (this.state.current_page === "attendance_page") {
        page = attendance_page;
        validation_page = this.state.attendance_validated
    } else if (this.state.current_page === "review_page") {
        page = review_page
    } else if (this.state.current_page === "visit_details_page") {
        page = visit_details_page
        validation_page = this.state.visit_details_validated
    } else {
      console.error("you have messed up")
    }

    const routeToHomePage=(event)=>{
        this.setState({...this.state, current_page: "welcome_page"})
        event.preventDefault()
    }

    const routeToBasicInfoPage=(event)=>{
        this.setState({...this.state, current_page: "basic_info_page"})
        event.preventDefault()
    }

    const routeToAttendancePage = (event) => {
        this.setState({...this.state, current_page: "attendance_page"})
        event.preventDefault()
    }

    const routeToVisitDetailsPage=(event)=>{
        this.setState({...this.state, current_page: "visit_details_page"})
        event.preventDefault()
    }

    const routeToReviewPage=(event)=>{
        this.setState({...this.state, current_page: "review_page"})
        event.preventDefault()
    }


    return (
        <div>
        <h2>Make a Reservation Request</h2>
        <Breadcrumb>
            {this.state.form.bread.includes("welcome_page") ?
                <Breadcrumb.Item onClick={routeToHomePage}>Home</Breadcrumb.Item> 
                :
                <Breadcrumb.Item active>Home</Breadcrumb.Item>
            }
            {this.state.form.bread.includes("basic_info_page") ?
                <Breadcrumb.Item onClick={routeToBasicInfoPage}>Basic Info</Breadcrumb.Item>
                :
                <Breadcrumb.Item active>Basic Info</Breadcrumb.Item>
            }
            {this.state.form.bread.includes("attendance_page") ?
                <Breadcrumb.Item onClick={routeToAttendancePage}>Attendance</Breadcrumb.Item> 
                :
                <Breadcrumb.Item active>Attendance</Breadcrumb.Item>
            }
            {this.state.form.bread.includes("visit_details_page") ?
                <Breadcrumb.Item onClick={routeToVisitDetailsPage}>Visit Details</Breadcrumb.Item> 
                :
                <Breadcrumb.Item active>Visit Details</Breadcrumb.Item>
            }
            {this.state.form.bread.includes("review_page") ?
                <Breadcrumb.Item onClick={routeToReviewPage}>Review</Breadcrumb.Item> 
                :
                <Breadcrumb.Item active>Review</Breadcrumb.Item>
            }
        </Breadcrumb>
        
        <Container>
            <Form noValidate validated={validation_page}>
                {page}
            </Form>
        </Container>
      </div>
    );

  }
}

export default ConsolidatedWizard;