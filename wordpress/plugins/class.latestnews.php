<?php
/**
 * Latestnews WP hooks 
 *
 * @package LatestNews 
 */
//Check if the user is admin then loads the admin page for settings else load the generic page
if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
	require_once LATESTNEWS_PLUGIN_DIR . '/admin/class.latestnewsadmin.php';
	add_action( 'init', array( 'Latestnews_Admin', 'init' ) );
}

class LatestNews {
	//Declare the initiate variable to track that hook API calls only one
	private static $initiated = false;

	/**
	 * Init function declaration 
	 */	 
	public static function init() {
		if ( ! self::$initiated ) {
			self::init_hooks();
		}
	}

	/**
	 * Initializes WordPress init hooks
	 */
	private static function init_hooks() {
		self::$initiated = true;
		
	}

	/**
	 * view function to load the view files
	 * @params string $name, name of the file name to load
	 */
	public static function view( $name, array $args = array() ) {
		$args = apply_filters( 'latestnews_view_arguments', $args, $name );
		
		foreach ( $args AS $key => $val ) {
			$$key = $val;
		}
		
		load_plugin_textdomain( 'latestnews' );

		$file = LATESTNEWS_PLUGIN_DIR . '/views/'. $name . '.php';

		include( $file );
	}

	/**
	 * Checking if the API key is defined in file as a constant
	 *  @return array | api key
	 */
	public static function get_api_key() {
		return apply_filters( 'latestnews_get_api_key', defined('API_KEY') ? constant('API_KEY') : get_option('latestnews_api_key') );
	}

	/**
	 * Check the api key is already defined
	 *  @return int|WP_Error Value 0 or WP_Error on failure. True on success.
	 */
	public static function predefined_api_key() {
		if ( defined( 'API_KEY' ) ) {
			return true;
		}
		
		return apply_filters( 'latestnews_predefined_api_key', false );
	}

	/**
	 * get the key and host for news API from option table
	 *  @return object API key and Host name object.
	 */
	public static function get_latestnews_options() {
		$lnews = (object) get_option( 'latestnews_api_key' );	
				
		return $lnews;
	}

	/**
	 * Get news from Google news API
	 *  @return string Html of the news content.
	 */
	public static function get_news_google() {
		$response_body = self::http_get();
		$response_body = $response_body ? json_decode($response_body) : '';
		$html = '<ul class="news-articles">';
		$i=1;
		if ($response_body) {
			foreach($response_body->articles as $news) {
				$html .= '<li class="news"><a target="_blank" href="' . $news->url . '">' . $news->title . '</a></li>';
				if ($i++ >= 10) 
					break;			
			}
		}
		else {
			$html .= 'No Latest news for selected config.';
		}		
		$html .= '</ul>';
		return $html;		
	}

	/**
	 * get_news_google_main
	 */
	public static function get_news_google_main() {
		$response_body = self::http_get();
		$response_body = $response_body ? json_decode($response_body) : '';
		$html = '<div class="news-articles-content">';
		$i=1;
		if ($response_body) {
			foreach($response_body->articles as $news) {
				//print '<pre>';print_r($news);exit;
				$html .= '<div class="news"><a target="_blank" href="' . $news->url . '">' . $news->title . '</a> 
							<div class="image"><img src="'.$news->urlToImage.'" /></div>
							<div class="summary">'.$news->description.' </div>  
							<div class="source"><b>Source: </b> '.$news->source->name.' </div>  
						</div>';
				if ($i++ >= 10) 
					break;			
			}
		}
		else {
			$html .= 'No Latest news for selected config.';
		}		
		$html .= '</div>';
		return $html;
	}

	/**
	 * Make a GET request to the Google News API.
	 * @return json string Response body, both empty in the case of a failure.
	 */
	public static function http_get() {		
		$api_key_host = get_option( 'latestnews_api_key' );
		$body = '';
		$country = $api_key_host['country'] ? $api_key_host['country'] : 'US';
		//generate the API URL
		if ($api_key_host) {
			$news_url = add_query_arg( array(
				'country' => $country,
				'apiKey' => $api_key_host['apiKey'],
			), 'https://' . $api_key_host['host'] );
	
			//Get the response from API
			$response = wp_remote_get( $news_url );
			
			//If response and response does not has any error
			if ($response && !$response->errors) {
				$body = wp_remote_retrieve_body( $response );
			}	
		}	

		return $body;
	}

	/**
	 * Log debugging info to the error log.
	 *
	 * Enabled when WP_DEBUG_LOG is enabled (and WP_DEBUG, since according to
	 * core, "WP_DEBUG_DISPLAY and WP_DEBUG_LOG perform no function unless
	 * WP_DEBUG is true), but can be disabled via the debug_log filter.
	 *
	 * @param mixed $debug_log The data to log.
	 */
	public static function log( $latestnews_debug ) {
		if ( apply_filters( 'latestnews_debug_log', defined( 'WP_DEBUG' ) && WP_DEBUG && defined( 'WP_DEBUG_LOG' ) && WP_DEBUG_LOG && defined( 'LATESTNEWS_DEBUG' ) && LATESTNEWS_DEBUG ) ) {
			error_log( print_r( compact( 'latestnews_debug' ), true ) );
		}
	}
}