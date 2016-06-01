
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import moment from 'moment';
import WFlag from 'react-icons/lib/fa/flag-o';
import WBookmark from 'react-icons/lib/fa/bookmark-o';
import BFlag from 'react-icons/lib/fa/flag';
import BBookmark from 'react-icons/lib/fa/bookmark';

import { fetchSubmissions, setActiveSubmission, updateSubmission } from 'forms/FormActions';
import Page from 'app/layout/Page';

@connect(({ forms }) => ({ forms }))
@Radium
export default class SubmissionList extends Component {
  constructor(props) {
    super(props);
    props.dispatch(fetchSubmissions(props.params.id));
  }

  onFlag(flagged) {
    this.props.dispatch(updateSubmission({ flagged }));
  }

  onBookmark(bookmarked) {
    this.props.dispatch(updateSubmission({ bookmarked }));
  }

  render() {
    const { submissions, activeSubmission } = this.props.forms;
    return (
      <Page>
        <div style={styles.container}>
          <Sidebar submissions={submissions}
            activeSubmission={submissions[activeSubmission]}
            onSelect={this.onSubmissionSelect.bind(this)} />
          <SubmissionDetail submission={submissions[activeSubmission]}
            onFlag={this.onFlag.bind(this)}
            onBookmark={this.onBookmark.bind(this)}/>
        </div>
      </Page>
    );
  }

  onSubmissionSelect(submission) {
    this.props.dispatch(setActiveSubmission(submission));
  }
}

@Radium
class Sidebar extends Component {
  render() {
    const { submissions, activeSubmission, onSelect} = this.props;
    return (
      <div style={styles.sidebar.container}>
        <div style={styles.sidebar.countContainer}>
          <p style={styles.sidebar.count}>{submissions.length}</p>
          <p style={styles.sidebar.count}>Submission{submissions.length === 1 ? '' : 's'}</p>
        </div>
        <input style={styles.sidebar.search} type='text' placeholder='Search' />
        <div style={styles.sidebar.sortContainer}>
          <select style={[styles.sidebar.sort, styles.sidebar.firstSort]}>
            <option>View All</option>
          </select>

          <select style={styles.sidebar.sort}>
            <option>Newest First</option>
          </select>
        </div>
        <div>
          {submissions.map((submission, key) => (
            <div onClick={() => onSelect(key)}
              style={[styles.sidebar.submissionContainer, submission._id === activeSubmission._id ? styles.sidebar.activeSubmission : {}]} key={key}>
              <span>{submissions.length - key}</span>
              <span>{moment(submission.date_updated).format('L LT')}</span>
              <div>
                {submission.flagged ? <span style={styles.sidebar.icon}><BFlag/></span> : null}
                {submission.bookmarked ? <span style={styles.sidebar.icon}><BBookmark/></span> : null}
              </div>
              <span></span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

@Radium
class SubmissionDetail extends Component {
  render() {
    const { submission } = this.props;
    if(!submission) {
      return (<h1 style={styles.detail.container}>No submissions</h1>);
    }

    return (
      <div style={styles.detail.container}>
        {this.renderAuthorDetail()}
        {this.renderAnswers()}
      </div>
    );
  }

  renderAnswers() {
    const { submission } = this.props;
    return (
      <div style={styles.detail.answersContainer}>
        {submission.replies.map((reply, key) => (
          <div style={styles.detail.questionContainer} key={key}>
            <h2 style={styles.detail.question}>{reply.question}</h2>
            <p>{this.renderAnswer(reply.answer)}</p>
          </div>
        ))}
      </div>
    );
  }

  renderAnswer(answer = {}) {
    if (answer.options) {
      return (
        <ul>
          {answer.options.map(option => (
            <li>- {option.title}</li>
          ))}
        </ul>
      );
    }

    return answer.text;
  }

  renderAuthorDetail() {
    const { submission, onFlag, onBookmark } = this.props;
    const author = submission.author || {};
    return (
      <div>
        <div style={styles.detail.headerContainer}>
          <span>{moment(submission.date_updated).format('L LT')}</span>
          <div>
            <span style={styles.sidebar.icon}>
              {submission.flagged ?
                <BFlag style={styles.detail.action} onClick={() => onFlag(false)}/> :
                <WFlag style={styles.detail.action} onClick={() => onFlag(true)}/> }
            </span>
            <span style={styles.sidebar.icon}>
              {submission.bookmarked ?
                <BBookmark style={styles.detail.action} onClick={() => onBookmark(false)}/> :
                <WBookmark style={styles.detail.action} onClick={() => onBookmark(true)}/>
              }
            </span>
          </div>
        </div>
        <div style={styles.detail.submissionContainer}>
          <div style={styles.detail.authorContainer}>
            <h2 style={styles.detail.authorTitle}>Submission Author Information</h2>
            <div style={styles.detail.authorDetailsContainer}>
              <div style={styles.detail.authorDetailsColumn}>
                <p>Name: {author.name}</p>
                <p>Location: {author.location}</p>
                <p>Email: {author.email}</p>
              </div>
              <div style={styles.detail.authorDetailsColumn}>
                <p>Age: {author.age}</p>
                <p>Phone: {author.phone}</p>
                <p>Occupation: {author.occupation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  detail: {
    questionContainer: {
      marginBottom: 20
    },
    action: {
      cursor: 'pointer'
    },
    answersContainer: {
      padding: '0 50px 50px 50px'
    },
    question: {
      fontWeight: 'bold',
      fontSize: '1.2em',
      marginBottom: 10
    },
    authorDetailsContainer: {
      display: 'flex',
      paddingTop: 10
    },
    authorDetailsColumn: {
      flex: 1
    },
    container: {
      flex: 3,
      display: 'flex',
      flexDirection: 'column',
      margin: '0 30px 30px 30px'
    },
    submissionContainer: {
      padding: 50
    },
    headerContainer: {
      paddingBottom: 8,
      borderBottom: '3px solid #aaa',
      display: 'flex',
      justifyContent: 'space-between'
    },
    authorContainer: {
      padding: 15,
      backgroundColor: '#ddd'
    },
    authorTitle: {
      fontSize: '1.2em'
    }
  },
  container: {
    display: 'flex'
  },
  sidebar: {
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    icon: {
      marginLeft: 3
    },
    count: {
      textAlign: 'center',
      fontSize: '1.5em'
    },
    countContainer: {
      marginBottom: 20
    },
    search: {
      height: 25,
      marginBottom: 20
    },
    sortContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    sort: {
      flex: 1
    },
    firstSort: {
      marginRight: 10
    },
    submissionContainer: {
      borderRadius: 2,
      backgroundColor: '#ddd',
      marginBottom: 5,
      padding: 8,
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#bbb'
      }
    },
    activeSubmission: {
      backgroundColor: '#bbb'
    }
  }
};
