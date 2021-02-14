# Spot-💖-Matic

![Banner](README_ASSETS/Banner.png)

*Submission for Hackthrob 2021*
<hr>

### Introduction

Finding love is tough, but finding things to do on your next date is even tougher. Well, no more! Introducing **Spot-o-Matic**. 

Spot-o-Matic takes into account your and your partner's preferences and suggests SPOTS for your next date.
The UI is inspired by the universally beloved Tinder swipe-style.

![Swipe Demo GIF](README_ASSETS/swipeDemo.gif)


The preferences of both partners are taken into account and passed through our *sophisticated* algorithm, that then rates the different activities based on your interests in them and then provides you a list of places on Google Maps that it thinks you would like to spend your next date at.

<!-- ![Google Maps Embeds](README_ASSETS/mapEmbed.gif) -->


### How to use it

It starts with one partner looking for something to do on their next date. They open up Spot-o-Matic and start a new search. They then provide their interests. Once that's done, they are given a 10 character long code. They share this code with their partner. The partner now opens Spot-o-Matic and continues the search by providing the code they recieved. They too provide their interests. The collection of the two sets of interests are evaluated and the potential SPOTs of interest are shown.

### Getting Technical

The UI is created in React. It interfaces with a CockroachDB database that stores the user preferences through an Express backed.