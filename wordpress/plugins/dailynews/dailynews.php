<?php
/*
Plugin Name: Daily Latest News
Plugin URI: 
Description: Get latest news from world using google API
Author: Bikash Tamuly
Author URI: https://bikashtamuly.com/
Text Domain: latest-news-google
Version: 1.0
*/
define( 'LATESTNEWS_VERSION', '1.0' );

define( 'LATESTNEWS_PLUGIN', __FILE__ );

define( 'LATESTNEWS_PLUGIN_BASENAME', plugin_basename( LATESTNEWS_PLUGIN ) );

define( 'LATESTNEWS_PLUGIN_NAME', trim( dirname( LATESTNEWS_PLUGIN_BASENAME ), '/' ) );

define( 'LATESTNEWS_PLUGIN_DIR', untrailingslashit( dirname( LATESTNEWS_PLUGIN ) ) );

require_once LATESTNEWS_PLUGIN_DIR . '/class.latestnews.php';
require_once LATESTNEWS_PLUGIN_DIR . './widget/class.latestnews-widget.php';