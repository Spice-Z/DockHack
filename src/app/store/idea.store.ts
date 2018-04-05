import { Action } from "redux";
import { IdeaActions } from "../actions/app.actions";
import { Idea } from "../idea";

export interface IIdeaState {
  ideas: Idea[];
}

export const INITIAL_STATE: IIdeaState = {
  ideas: [
    {
      id: 1,
      text:
        "うーん、SNSを何度も、開いては閉じるのは何でだろう。そのせいで時間がすぎるのだけれど、その理由がわからない。 でも、その特性が、その表示方法からくるものならば、それを利用して思考を深めるようなアプリが作れたら面白いと思う。 それを作ろうとしているのが今表示しているこれ。",
      date: new Date(),
      mentionTo: 0
    },
    {
      id: 2,
      text:
        "思考を深める上で、余白って大事だと思う。一つのつぶやきを参照しているときの別画面ではもっと重要。",
      date: new Date(),
      mentionTo: 0
    },
    {
      id: 3,
      text:
        "スペースキーを押すだけでランダムにカラーパレットが生成されるツール。表示された色の色相や彩度、明度などを直感的な操作で変更したり、メインとなる色を固定し、他の色をランダムに表示させて組み合わせを試すといった使い方ができます。",
      date: new Date(),
      mentionTo: 0
    },
    {
      id: 4,
      text:
        "何気ないひとことって、その度に忘れているけど、 時間がたったらまたおなじことを思っている気がする。",
      date: new Date(),
      mentionTo: 0
    },
    {
      id: 5,
      text: "この画面、タイムラインではないな。なんだろう。ideaのラインでIL？",
      date: new Date(),
      mentionTo: 0
    },
    {
      id: 6,
      text:
        "ツイッタみたいな文字制限あったほうがいいな。長くしたい場合は下に連なっているほうがよいな。 それが見やすいし、表示もしやすい。自動的に中身を区切るから、あとからもみやすい。",
      date: new Date(),
      mentionTo: 0
    },
    {
      id: 7,
      text:
        "デザインは、カード型がいいのか、ついったみたいなラインがいいのかわからない。",
      date: new Date(),
      mentionTo: 0
    },
    {
      id: 8,
      text:
        "機能を揃えて実際に動かしながら考えたほうが早そうなので、とりあえずTwitterの色合いとかを真似して実装しとく。後から変えよう。",
      date: new Date(),
      mentionTo: 7
    },
    {
      id: 9,
      text:
        "angularのlimitTo、使うために何かしらinjectしたりしなきゃいけないらしい。それを乗り越えればならない。いい勉強だ。",
      date: new Date(),
      mentionTo: 6
    },
    {
      id: 10,
      text:
        "これはインスピレーションを深めるアプリ。因果関係をわかりやすく表示しているアプリがあっても面白いかもしれない。",
      date: new Date(),
      mentionTo: 0
    },
    {
      id: 11,
      text:
        "結果も原因も複数になることがあるから、それを直感的に理解できるような描画方法が大事だ。矢印で言葉同士の関係が一目瞭然とか。",
      date: new Date(),
      mentionTo: 10
    }
  ]
};

export function rootReducer(lastState: IIdeaState, action: Action): IIdeaState {
  return lastState;
}
