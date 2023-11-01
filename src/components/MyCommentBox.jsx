import React from "react";
// import CommentBox from "./CommentBox.jsx";
// a copy of react-commentbox component as npm package, this import link below
import CommentBox from "react-commentbox";

class MyCommentBox extends React.Component {
  state = { authorName: "", authorNameIsSet: false };

  onChangeAuthorName = (e) =>
    this.setState({ authorName: e.currentTarget.value });

  onSubmitAuthorName = (e) => {
    e.preventDefault();

    this.setState({ authorNameIsSet: true });
  };

  getComments = () => {
    console.log(this.props.subjectId);
    return this.props.contentfulClient
      .getEntries({
        content_type: "comment",
        // order: "sys.createdAt",
        "fields.subject.sys.id": this.props.subjectId,
      })
      .then((response) => {
        console.log("response: ", response);
        const check = response.items.map((item) => {
          return item.fields.subject.sys.id === this.props.subjectId
            ? item
            : null;
        });
        return check.filter((item) => item !== null);
      })
      .catch(console.error);
  };

  normalizeComment = (comment) => {
    const { id, createdAt } = comment.sys;
    const { body, author, parentComment } = comment.fields;
    return {
      id,
      bodyDisplay: body,
      userNameDisplay: author + " ",
      timestampDisplay: createdAt.split("T")[0],
      belongsToAuthor: false,
      parentCommentId: parentComment ? parentComment.sys.id : null,
    };
  };

  // make an API call to post a comment
  comment = (body, parentCommentId = null) => {
    return this.props.postData("/create-comment", {
      body,
      parentCommentId,
      authorName: this.state.authorName,
      subjectId: this.props.subjectId,
    });
  };

  // will be shown when the comment box is disabled
  disabledComponent = (props) => {
    return (
      <form className="author-name" onSubmit={this.onSubmitAuthorName}>
        <input
          type="text"
          placeholder="Enter your name to post a comment"
          value={this.state.authorName}
          onChange={this.onChangeAuthorName}
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

  render() {
    return (
      <div>
        <h4>Comments</h4>
        <CommentBox
          disabled={!this.state.authorNameIsSet}
          getComments={this.getComments}
          normalizeComment={this.normalizeComment}
          comment={this.comment}
          disabledComponent={this.disabledComponent}
        />{" "}
      </div>
    );
  }
}

export default MyCommentBox;
