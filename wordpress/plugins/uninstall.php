<?php
/**
 * The uninstall file
 * @package dailynews
 */
// if uninstall.php is not called by WordPress, die
if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}
//Delete the row in option table
$option_name = 'latestnews_api_key';
 
delete_option($option_name);