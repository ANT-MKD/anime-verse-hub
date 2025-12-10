import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received messages:", messages.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Tu es AnimeBot, un assistant expert en anime passionné et sympathique. Tu connais parfaitement les animes suivants et leurs personnages:

- Haikyuu!! (volleyball) : Hinata Shouyou, Kageyama Tobio, Tsukishima Kei, Nishinoya Yuu
- Solo Leveling : Sung Jin-Woo, Cha Hae-In, Go Gun-Hee
- Jujutsu Kaisen : Gojo Satoru, Itadori Yuji, Megumi Fushiguro, Nobara Kugisaki
- Demon Slayer : Tanjiro Kamado, Nezuko Kamado, Zenitsu Agatsuma, Inosuke Hashibira
- Hunter x Hunter : Gon Freecss, Killua Zoldyck, Kurapika, Leorio
- Naruto : Naruto Uzumaki, Sasuke Uchiha, Sakura Haruno, Kakashi Hatake

Tu peux:
- Répondre aux questions sur ces animes et personnages
- Recommander des animes similaires
- Expliquer les pouvoirs et techniques des personnages
- Discuter des arcs narratifs et moments mémorables
- Comparer des personnages entre différents animes

Réponds toujours en français de manière enthousiaste et passionnée. Utilise des émojis anime-related parfois. Garde tes réponses concises mais informatives.`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez plus tard." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits épuisés, veuillez recharger." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Erreur du service AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
