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

  stable var posts : [Post] = [
    {
      id = 0;
      title = "Presidential Debate Highlights";
      content = "<p>Last night's presidential debate showcased the stark differences between the two candidates. Key topics included healthcare reform, economic recovery plans, and foreign policy. The incumbent emphasized their administration's achievements, while the challenger presented alternative approaches to pressing national issues.</p><p>Fact-checkers were busy throughout the night, verifying claims made by both candidates. Some notable moments included heated exchanges on climate change policies and proposed tax reforms.</p><p>Polls conducted immediately after the debate showed a mixed response from viewers, with both candidates claiming victory. Political analysts are now dissecting the debate's potential impact on undecided voters in key swing states.</p>";
      imageUrl = ?"https://example.com/debate-image.jpg";
      timestamp = Time.now() - 86400000000000;
    },
    {
      id = 1;
      title = "Early Voting Begins in Key Battleground States";
      content = "<p>Early voting has commenced in several crucial battleground states, marking a significant phase in the lead-up to Election Day. States like Florida, Ohio, and North Carolina have opened their polling stations, allowing residents to cast their ballots ahead of time.</p><p>Election officials report a surge in early voting numbers compared to previous elections, attributed partly to concerns over COVID-19 and a desire to avoid long lines on Election Day. Both campaigns are closely monitoring these early voting trends, as they could provide insights into voter enthusiasm and potential outcomes.</p><p>Voter advocacy groups are working tirelessly to ensure all eligible voters are aware of their early voting options and rights. Meanwhile, election security experts are on high alert, implementing measures to safeguard the integrity of the voting process.</p>";
      imageUrl = ?"https://example.com/early-voting-image.jpg";
      timestamp = Time.now() - 43200000000000;
    },
    {
      id = 2;
      title = "Campaign Trail: Candidates Focus on Swing States";
      content = "<p>With just weeks to go before Election Day, both presidential candidates are intensifying their efforts in key swing states. Recent rallies in Pennsylvania, Michigan, and Wisconsin have drawn large crowds, with each candidate tailoring their message to address local concerns and issues.</p><p>The incumbent's campaign is emphasizing economic recovery and job creation, particularly in states hit hard by manufacturing declines. Meanwhile, the challenger is focusing on healthcare reform and climate change policies, aiming to energize younger voters and suburban demographics.</p><p>Local politicians and celebrities are joining the candidates on the trail, adding star power to these crucial campaign events. Both sides are also leveraging social media and virtual events to reach voters while adhering to COVID-19 safety guidelines.</p><p>As the race tightens, political analysts are closely watching how these targeted campaign efforts might sway undecided voters in these battleground states, which could ultimately determine the election's outcome.</p>";
      imageUrl = ?"https://example.com/campaign-trail-image.jpg";
      timestamp = Time.now() - 21600000000000;
    },
    {
      id = 3;
      title = "Election Security Measures Ramped Up";
      content = "<p>As Election Day approaches, federal and state officials are implementing unprecedented security measures to protect the integrity of the voting process. The Department of Homeland Security, in collaboration with state election boards, has announced a series of initiatives to safeguard against potential cyber threats and misinformation campaigns.</p><p>Key measures include enhanced cybersecurity protocols for voting machines and election management systems, increased monitoring of social media platforms for disinformation, and the deployment of rapid response teams to address any security breaches or irregularities.</p><p>Election officials are also working to educate voters about the security of mail-in ballots and the importance of verifying information from credible sources. These efforts aim to boost public confidence in the electoral process and ensure a smooth, secure election.</p>";
      imageUrl = ?"https://example.com/election-security-image.jpg";
      timestamp = Time.now() - 10800000000000;
    },
    {
      id = 4;
      title = "Economic Policies Take Center Stage in Campaign";
      content = "<p>As the election draws near, economic policies have become a focal point of both campaigns. The candidates have presented contrasting visions for America's economic future, sparking intense debates among voters and economists alike.</p><p>The incumbent is championing their administration's pre-pandemic economic growth and promising a rapid recovery through tax cuts and deregulation. In contrast, the challenger is proposing significant investments in infrastructure, clean energy, and education, funded partly by increased taxes on corporations and high-income earners.</p><p>Economic experts are divided on the potential impacts of these policies, with some warning of increased national debt under both plans. Voters in rust belt states and urban centers are paying particularly close attention to proposals addressing job creation and income inequality.</p><p>As Election Day approaches, both candidates are expected to further refine and promote their economic plans, recognizing the crucial role the economy plays in swaying undecided voters.</p>";
      imageUrl = ?"https://example.com/economic-policy-image.jpg";
      timestamp = Time.now();
    }
  ];
  stable var nextPostId : Nat = 5;

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
