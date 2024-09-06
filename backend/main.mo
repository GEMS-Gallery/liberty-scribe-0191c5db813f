import Bool "mo:base/Bool";
import Nat "mo:base/Nat";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Option "mo:base/Option";

actor {
  type Post = {
    id: Nat;
    title: Text;
    content: Text;
    imageUrl: ?Text;
    timestamp: Int;
  };

  stable var posts : [Post] = [];
  stable var nextPostId : Nat = 0;

  public func createPost(title: Text, content: Text, imageUrl: ?Text) : async Nat {
    let post : Post = {
      id = nextPostId;
      title = title;
      content = content;
      imageUrl = imageUrl;
      timestamp = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextPostId += 1;
    nextPostId - 1
  };

  public query func getPosts() : async [Post] {
    Array.sort(posts, func(a: Post, b: Post) : { #less; #equal; #greater } {
      Int.compare(b.timestamp, a.timestamp)
    })
  };

  public query func getPost(id: Nat) : async ?Post {
    Array.find(posts, func(post: Post) : Bool { post.id == id })
  };
}
