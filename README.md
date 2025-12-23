<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="https://i.ibb.co/yBhBsGyf/Group-11-1.png">
    <source media="(prefers-color-scheme: dark)" srcset="https://i.ibb.co/4R9q41hn/Group-11.png">
    <img src="https://i.ibb.co/yBhBsGyf/Group-11-1.png" alt="Spicetown Logo">
  </picture>
</p><br>
<div align="center">
  <a href="https://github.com/SabioOfficial/spicetown/commits/main/" target="_blank">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/SabioOfficial/spicetown?style=for-the-badge">⠀
  </a>
  <a href="#">
    <img alt="Chrome Web Store Users" src="https://img.shields.io/chrome-web-store/users/kbcbgiihiopcbgimdopcfcemikagemgl?style=for-the-badge&label=Downloads">
  </a>
</div>
<br>
<p>Spicetown is a QoL-focused extension for Chrome <a href="#status-on-porting-to-firefox">and Firefox*</a></i> that tries to improve the flow of Flavortown such as Themes, more (important) project info, and much more in the works!</p>

<h5>Table of Contents</h5>
<ul>
  <li><a href="#features">Features</a>
    <ul>
      <li><a href="#project-stats+">Project Stats+</a>
        <ul>
          <li><a href="#examples-project-stats+">Examples</a></li>
        </ul>
      </li>
      <li><a href="#settings+">Settings+</a></li>
      <li><a href="#themes">Themes <i>(⚠️ WIP)</i></a>
        <ul>
          <li><a href="#implementing-themes">Implementing Themes <i>(in V2; ⚠️ WIP)</i></a></li>
          <li><a href="#themes-ruby">Ruby <i>(⚠️ WIP)</i></a></li>
          <li><a href="#themes-catppuccin">catppuccin <i>(⚠️ WIP)</i></a>
            <ul>
              <li><a href="#themes-catppuccin-mocha">catppuccin Mocha <i>(⚠️ WIP)</i></a></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li><a href="#improvements">Improvements</a>
    <ul>
      <li><a href="#exposed-achievements">Exposed Achievements</a></li>
      <li><a href="#voting+">Voting+</a></li>
    </ul>
  </li>
  <li>
    <a href="#ports">Ports</a>
    <ul>
      <li><a href="#ports-firefox">Firefox</a></li>
    </ul>
  </li>
</ul>

<h2 id="features">Features</h2>
<p>Spicetown-integrated features are the main focus of Spicetown. These usually try to improve the flow of Flavortown. Currently, there are <b>3</b> features available for public use. Feel free to contribute and add new features!</p>

<h3 id="project-stats+">Project Stats+</h3>
<i><u>Also known as "Extra Project Stats"</u></i>
<p>Project Stats+ adds minutes per devlog tracking, and time per day tracking. Both of them also show ratings of if they're at the recommended level or not.</p>

<table>
  <tr>
    <th>Minutes <small>/ per devlog</small></th>
    <th>Rating</th>
  </tr>
  <tr>
    <td>≥150, ≤9</td>
    <td>Awful</td>
  </tr>
  <tr>
    <td>120-149, 10-14</td>
    <td>Bad</td>
  </tr>
  <tr>
    <td>101-119, 15-19</td>
    <td>Okay</td>
  </tr>
  <tr>
    <td>81-100, 20-39</td>
    <td>Good</td>
  </tr>
  <tr>
    <td>40-80</td>
    <td>Great</td>
  </tr>
</table>
<table>
  <tr>
    <th>Time <small style="font-size: 0.8rem">/ per day</small></th>
    <th>Rating</th>
  </tr>
  <tr>
    <td>≤29m</td>
    <td>Awful</td>
  </tr>
  <tr>
    <td>30m-59m</td>
    <td>Bad</td>
  </tr>
  <tr>
    <td>1hr-1hr 59m</td>
    <td>Okay</td>
  </tr>
  <tr>
    <td>2hrs-2hr 59m</td>
    <td>Good</td>
  </tr>
  <tr>
    <td>≥3hrs</td>
    <td>Great</td>
  </tr>
</table>

<h4 id="examples-project-stats+">Examples</h4>
<p>These are all randomly selected projects! <i>(Except for Spicetown)</i></p>
<img src="https://i.ibb.co/pj2FYzfG/Screenshot-2025-12-20-122712.png" alt="Screenshot 2025 12 20 122712">
<img src="https://i.ibb.co/KpjfMB0V/Screenshot-2025-12-20-122852.png" alt="Screenshot 2025 12 20 122852">
<img src="https://i.ibb.co/wNV0f1L7/Screenshot-2025-12-20-122934.png" alt="Screenshot 2025 12 20 122934">
<img src="https://i.ibb.co/FkKthN5S/Screenshot-2025-12-20-123044.png" alt="Screenshot 2025 12 20 123044">

<h3 id="settings+">Settings+</h3>
<i><u>Also known as "Spicetown Settings"</u></i>
<p>Settings+ adds "Screenshare Mode" <i><a href="https://hackclub.slack.com/archives/C09MPB8NE8H/p1766001569993999">(concept discussed here)</a></i> which hides <i>most <a href="https://github.com/SabioOfficial/spicetown/issues/3">[see issue here: #3]</a></i> sensitive elements. It also replaces blur, which is known to be unsafe. More settings is in the works, and will be released soon!</p>

<table>
  <tr>
    <th align="left">Setting</th>
    <th align="left">Released</th>
    <th align="left">Maintained</th>
    <th align="left">Issues</th>
  </tr>
  <tr>
    <td>Screenshare Mode</td>
    <td>TBD <small>(In-dev 17/12/25)</small></td>
    <td>No</td>
    <td>Yes <small><a href="https://github.com/SabioOfficial/spicetown/issues/3">[#3]</a></small></td>
  </tr>
</table>

<h3 id="themes">Themes</h3>
<p>In Spicetown, we support themes for Flavortown, modifying the colors and vibe of Flavortown to your liking! Currently, there are <b>2</b> themes available to choose from. <small>(<b>1</b> Flavortown integrated)</small></p>

<table>
  <tr>
    <th align="left">Theme</th>
    <th align="left">Color</th>
    <th align="left">Released</th>
    <th align="left">Maintained</th>
    <th align="left">Issues</th>
  </tr>
  <tr>
    <td>Ruby</td>
    <td>Red</td>
    <td>TBD <small>(In-dev 19/12/25)</small></td>
    <td>Yes</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Catppuccin <small>Mocha</small></td>
    <td>Lavender</td>
    <td>TBD <small>(In-dev 21/12/25)</small></td>
    <td>Yes</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Catppuccin <small>Macchiato</small></td>
    <td>Mauve</td>
    <td>TBD <small>(In-dev 21/12/25)</small></td>
    <td>Yes</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Charcoal</td>
    <td>Gray</td>
    <td>TBD <small>(In-dev 23/12/25)</small></td>
    <td>Yes</td>
    <td>None</td>
  </tr>
</table>

<h3 id="implementing-themes">Implementing Themes</h3>
<p>To implement themes, access the content.css file in /scripts. There, you will find <code>[data-theme="bg-color-ruby"]</code> along with other themes. You can add a new theme by adding a new data theme, for example: <code>[data-theme="bg-color-log"]</code>. Use the other themes as a rough template on the CSS variables you need to add to your theme. You will also need to add a new <code>themes__div-option</code> to the themes page located in <code>addThemesPage()</code> in <code>content.js</code>.</p>

<h3 id="themes-ruby">Ruby</h3>
<p>Ruby is the first custom theme of Spicetown <i>(and probably Flavortown as a whole!)</i> which is in heavy development. You can enable the Ruby theme via the Themes page <i>(which is inaccessible to non-Spicetown users)</i>. It consists of mostly darkish red.</p>

<h3 id="themes-catppuccin">Catppuccin</h3>
<p><b>Catppuccin</b> is the most requested theme family for <b>Spicetown</b>. The first Catppuccin theme was released <i>(in-dev)</i> on <b>21/12/25</b>. This is also the first theme family for <b>Spicetown</b>.</p>

<h4 id="themes-catppuccin-mocha">Catppuccin <small>Mocha</small></h3>
<p><b>Catppuccin Mocha</b> is the first Catppuccin theme to be added. It is the second theme added to <b>Spicetown</b> after Ruby. It uses a Lavender-based design.</p>

<h4 id="themes-catppuccin-macchiato">Catppuccin <small>Macchiato</small></h4>
<p><b>Catpuccin Macchiato</b> is the second Catppuccin theme to be addded. It is the third theme added to <b>Spicetown</b> after Catppuccin <small>Mocha</small>. Because of Neon, one of the Flavortown dev's "request", this theme uses a Mauve design. This theme is a work in progress.</p>

<h3 id="themes-charcoal">Charcoal</h4>
<p><b>Charcoal</b> is the fourth theme added to <b>Spicetown</b> after Catppuccin <small>Macchiato</small>. Originally the theme would have everything on fire, but looked too much like a halloween theme than anything. Until more projects ship so I can test voting css, this is a work in progress.</p>

<h2 id="improvements">Improvements</h2>
<p>Spicetown regularly makes improvements to existing Flavortown features. These improvements mostly either improves the UI or adds hidden, scrapped Flavortown functionalities back into Flavortown.</p>

<table>
  <tr>
    <th align="left">Improvement</th>
    <th align="left">Page <small>/ Feature</small></th>
    <th align="left">Released</th>
    <th align="left">Maintained</th>
    <th align="left">Issues</th>
  </tr>
  <tr>
    <td>Exposed Achievements</td>
    <td>Achievements</td>
    <td>TBD <small>(In-dev 19/12/25)</small></td>
    <td>Yes</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Voting+</td>
    <td>Voting</td>
    <td>TBD <small>(In-dev 19/12/25)</small></td>
    <td>No</td>
    <td>None</td>
  </tr>
</table>

<h3 id="exposed-achievements">Exposed Achievements</h3>
<p>Exposed Achievements exposes hidden and secret achievements by replacing the "???" title, mysterious description, and "?" cookie reward with the actual ones straight from the source code! Please not that this process is currently <b>not automatic</b>. New achievements will <b>not</b> be exposed immediately without manual input.</p>

<h3 id="voting+">Voting+</h3>
<p>Voting+ adds the "Skip" button, which refreshes the page and shorterns the "See my previous votes" to "Previous votes".</p>

<h2 id="ports">Ports</h2>
<p>I am working very hard to get ports to different browsers working- but I have decided to prioritize features instead. More information about ports soon.</p>

<h3 id="ports-firefox">Firefox</h2>
<p>This is the most requested port for Spicetown. I am yet to start working on porting this to Firefox. Please <a href="https://hackclub.enterprise.slack.com/archives/C09NYLMB4VC">join</a> the Slack channel for more details.</p>