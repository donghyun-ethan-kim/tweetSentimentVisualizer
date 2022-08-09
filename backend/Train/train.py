import fasttext
import nest_asyncio
import twint
import networkx as nx
import pandas as pd
import numpy as np
import re
from networkx.readwrite import json_graph
import json
import json


#a = model.predict("Which baking dish is best to bake a banana bread ?", k=2)
#print(a[1][0]) #: positive
#print(a[1][1]) #r: negative


def twintSearch():
    #nest_asyncio.apply()

    C = twint.Config()
    C.Search = "Manchester United"
    C.Store_csv = True
    #C.Hide_output = True
    C.Since = '2022-07-09'
    C.Limit = 1000
    C.Store_csv = True
    C.Output = "soccer-tweets.csv"

    # Run
    twint.run.Search(C)


def clean_tweet(tweet):
    if type(tweet) == np.float:
        return ""
    stopwords = ["for", "on", "an", "a", "of", "and", "in", "the", "to", "from"]

    temp = tweet.lower()
    temp = re.sub("'", "", temp)  # to avoid removing contractions in english
    temp = re.sub("@[A-Za-z0-9_]+", "", temp)
    temp = re.sub("#[A-Za-z0-9_]+", "", temp)
    temp = re.sub(r'http\S+', '', temp)
    temp = re.sub('[()!?]', ' ', temp)
    temp = re.sub('\[.*?\]', ' ', temp)
    temp = re.sub("[^a-z0-9]", " ", temp)
    temp = temp.split()
    temp = [w for w in temp if not w in stopwords]
    temp = " ".join(word for word in temp)
    return temp


def createDf():
    # Read in the tweets
    file_in = 'soccer-tweets.csv'
    df = pd.read_csv(file_in)

    # replace NaN's with an empty string
    df = df.replace(np.nan, '')

    df_new = df.drop_duplicates(subset=['username'])

    df_new['tweet_clean'] = df_new['tweet'].map(lambda x: clean_tweet(x))
    df_new['tweet_clean'].replace('', np.nan, inplace=True)
    df_new['tweet_clean'].replace('\n', np.nan, inplace=True)
    df_new.dropna(subset=['tweet_clean'], inplace=True)

    return df_new




def sentimentAdd(df_new, model):
    # Calling BERT based sentiment score function for every tweet
    #print("CHECK??\n\n")
    #print(model.predict(df_new['tweet_clean'][0], k = 2)[1][0])
    df_new['Sentiment'] = df_new['tweet_clean'].map(lambda x: model.predict(x, k = 2)[1][0])
    #df_new['Sentiment'] = model.predict(df_new['tweet_clean'], k = 2)[1][0] #positive sentiment probability
    #print(df_new.head(10))
    return df_new


def createGraph(df_new):
    # create a networkx directed graph
    G_mention = nx.DiGraph()

    # loop through each row
    for r in df_new.iterrows():
        # should be index, row --> that's why r[1] is used!
        author = r[1]['username']
        author = f'@{author}'
        senti = r[1]['Sentiment']
        text = r[1]['tweet']

        # try:
        #    timestamp = pd.to_datetime(r[1]['created_at']).astype(str)
        # .astype(str) is addition
        # except:
        #    continue

        # use regular expressions to extract retweets and mentions
        mentions = set(re.findall(r"@(\w+)", text))

        # add the users if there are any mentioned in the text.
        has_users = len(mentions) > 0
        if has_users:
            # for u in retweets:
            #    u = f'@{u}'
            #    G_retweet.add_node(author, sentiment = senti)
            #    G_retweet.add_node(u)
            #    G_retweet.add_edge(author, u)
            # nx.set_node_attributes(G_retweet, {author:r[1]['Sentiment']}, 'Sentiment')

            # G_retweet.add_edge(author, u, Timestamp=timestamp)

            for u in mentions:
                u = f'@{u}'
                G_mention.add_node(author, sentiment=senti)
                G_mention.add_node(u)
                G_mention.add_edge(author, u)
                # nx.set_node_attributes(G_mention, {author:r[1]['Sentiment']}, 'Sentiment')

                # G_mention.add_edge(author, u, Timestamp=timestamp)

    for node in list(G_mention.nodes(data=True)):
        #print(node[1])
        if (not any(node[1])): #node[1] is the sentiment data
            #any returns True if any item in an iterable are true
            #basically remove all nodes with missing sentiment data
            #print(node)
            G_mention.remove_node(node[0])
        # print(node[1])

    degreeList = sorted(G_mention.degree, key=lambda x: int(x[1]), reverse=True) #sort nodes by degree
    #nodeList = np.array(list(G_mention.nodes()))
    #node_id = np.where(nodeList == "@dexterdagenius")
    #print(node_id[0][0])
    #print(G_mention.degree)
    includedNode = degreeList[0][0] #name of node with  highest degree
    #print(degreeList[0][0])
    #print(degreeList[0])
    #print("YES")
    s = G_mention.subgraph(nx.shortest_path(G_mention.to_undirected(), includedNode)) #subgraph with all nodes including the chosen node
    #extract the connected component containing a given node
    #print(s.nodes())
    #return list(G_mention.nodes(data=True))
    #return list(s.nodes(data=True))
    return json_graph.node_link_data(s) #return json representation of graph!

def returnJson():
    # some JSON:
    #x = '{ "name":"John", "age":30, "city":"New York"}'

    # parse x:
    #y = json.loads(x)
    #return y
    model = fasttext.train_supervised('Train/tweets.train')
    #model = fasttext.train_supervised('tweets.train')

    twintSearch()
    df_new = createDf()
    df_new = sentimentAdd(df_new, model)
    returnedList = createGraph(df_new)

    with open('graph.json', 'w') as f:
        json.dump(returnedList, f, indent=4)

    #return json.dumps(returnedList)
    #print(json.dumps(returnedList))
    #print(returnedList)
    # jsonStr = json.dumps(returnedList)
    # return jsonStr

    # jsonFile = open("data.json", "w")
    # jsonFile.write(jsonStr)
    # jsonFile.close()

#print("HELLO?")
#returnJson()
